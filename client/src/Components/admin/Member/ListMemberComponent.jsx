import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { retrieveUsersByWorkspaceIdApi, retrieveWorkspaceByIdApi } from "../../../api/ExecutiveInsightApiService";

import MemberComponent from "./MemberComponent";
import InviteMemberComponent from "./InviteMemberComponent";

import '../../../styles/ListComponent.css';

export default function ListMemberComponent() {


    const [userJoinWorkspaces, setUserJoinWorkspaces] = useState([{}]);
    const [posts, setPosts] = useState([{}]);
    const [hasPosts, setHasPosts] = useState(false);
    const [teams, setTeams] = useState([{}]);
    const [hasTeams, setHasTeams] = useState(false);
    const [show, setShow] = useState(false);
    const [workspaceCode, setWorkspaceCode] = useState('');
    const [hasUserJoinWorkspaces, setHasUserJoinWorkspaces] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUser = async () => {
            await retrieveUsersByWorkspaceIdApi(id)
                .then((response) => {
                    setUserJoinWorkspaces(response.data)
                    setHasUserJoinWorkspaces(response.data.length > 0)
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
    }, [id, navigate])

    return (
        <div className="EmployeesComponent">
            {show &&
                <InviteMemberComponent workspaceCode={workspaceCode} setShow={setShow} />
            }
            <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-10 text-end">
                    <h2 className="text-start mx-3">Members</h2>
                    <hr />
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="w-100 py-2 create text-center" onClick={() => setShow(true)}><FontAwesomeIcon icon={faPlus} /></div>
                                </td>
                            </tr>
                            {hasUserJoinWorkspaces &&
                                userJoinWorkspaces.map(
                                    userJoinWorkspace => (
                                        <tr key={userJoinWorkspace.userJoinWorkspaceId}>
                                            <td>
                                                <MemberComponent userJoinWorkspace={userJoinWorkspace} hasPosts={hasPosts} hasTeams={hasTeams} posts={posts} teams={teams} workspaceCode={workspaceCode} id={id} />
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}