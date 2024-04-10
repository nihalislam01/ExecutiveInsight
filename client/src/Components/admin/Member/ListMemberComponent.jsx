import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { retrieveUsersByWorkspaceIdApi, retrieveWorkspaceByIdApi } from "../../../api/ExecutiveInsightApiService";

import SingleMemberComponent from "./SingleMemberComponent";
import InviteMemberComponent from "./InviteMemberComponent";
import { useAuth } from "../../../security/AuthContext";

export default function ListMemberComponent() {


    const [userJoinWorkspaces, setUserJoinWorkspaces] = useState([{}]);
    const [posts, setPosts] = useState([{}]);
    const [hasPosts, setHasPosts] = useState(false);
    const [teams, setTeams] = useState([{}]);
    const [hasTeams, setHasTeams] = useState(false);
    const [show, setShow] = useState(false);
    const [workspaceCode, setWorkspaceCode] = useState('');
    const [hasUserJoinWorkspaces, setHasUserJoinWorkspaces] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredUserJoinWorkspaces, setFilteredUserJoinWorkspaces] = useState([{}]);

    const navigate = useNavigate();
    const { id } = useParams();
    const authContext = useAuth();

    useEffect(() => {
        authContext.refresh();
        const getUser = async () => {
            await retrieveUsersByWorkspaceIdApi(id)
                .then((response) => {
                    setUserJoinWorkspaces(response.data)
                    setHasUserJoinWorkspaces(response.data.length > 0)
                    setFilteredUserJoinWorkspaces(response.data)
                })
                .catch((error) => {
                    console.log("Error fetching users:" + error)
                    navigate('/error')
                })
        }
        getUser();
        const getWorkspace = async () => {
            await retrieveWorkspaceByIdApi(id)
                    .then((response) => {
                        setWorkspaceCode(response.data.code);
                        setPosts(response.data.posts);
                        setHasPosts(response.data.posts.length > 0);
                        setTeams(response.data.teams);
                        setHasTeams(response.data.teams.length > 0);
                    })
                    .catch((error) => {
                        console.log("Error fetching workspace:" + error)
                        navigate('/error')
                })
        }
        getWorkspace();
    }, [authContext, id, navigate])


    const handleSearch = (event) => {
        const term = event.target.value;
        setSearch(term);
        const filtered = userJoinWorkspaces.filter(userJoinWorkspace =>
            userJoinWorkspace.user.name.toLowerCase().includes(term.toLowerCase())
        );
        setHasUserJoinWorkspaces(filtered.length > 0);
        setFilteredUserJoinWorkspaces(filtered);
    }


    return (
        <div className="background-05 w-100 p-4">
            {show &&
                <InviteMemberComponent workspaceCode={workspaceCode} setShow={setShow} />
            }
            <div className="d-flex">
                <h2 className="text-start mx-3">Members</h2>
                <input placeholder="&#xf002; Search Member" value={search} style={{ fontFamily: 'Arial, FontAwesome', marginLeft: "130px", backgroundColor: "#f8f9fa" }} className="form-control w-50 text-center" onChange={handleSearch}/>
            </div>
            <hr />
            <table className="table">
                <tbody>
                    <tr>
                        <td>
                            <div className="w-100 py-2 create text-center" onClick={() => setShow(true)}><FontAwesomeIcon icon={faPlus} /></div>
                        </td>
                    </tr>
                    {hasUserJoinWorkspaces &&
                        filteredUserJoinWorkspaces.map(
                            userJoinWorkspace => (
                                <tr key={userJoinWorkspace.userJoinWorkspaceId}>
                                    <td>
                                        <SingleMemberComponent userJoinWorkspace={userJoinWorkspace} hasPosts={hasPosts} hasTeams={hasTeams} posts={posts} teams={teams} workspaceCode={workspaceCode} id={id} />
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}