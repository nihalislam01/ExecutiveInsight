import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveUsersByWorkspaceIdApi, retrieveWorkspaceByIdApi } from "../api/ExecutiveInsightApiService";
import EmployeeComponent from "./EmployeeComponent";
import InviteEmployeeComponent from "./InviteEmployeeComponent";

export default function ListEmployeeComponent() {


    const [userJoinWorkspaces, setUserJoinWorkspaces] = useState([{}]);
    const [posts, setPosts] = useState([{}]);
    const [hasPosts, setHasPosts] = useState([{}]);
    const [show, setShow] = useState(false);
    const [workspaceCode, setWorkspaceCode] = useState('');
    const [hasUserJoinWorkspaces, setHasUserJoinWorkspaces] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        retrieveUsersByWorkspaceIdApi(id)
            .then((response) => {
                setUserJoinWorkspaces(response.data)
                setHasUserJoinWorkspaces(response.data.length > 0)
            })
            .catch((error) => navigate('/error'))
        retrieveWorkspaceByIdApi(id)
            .then((response) => {
                setWorkspaceCode(response.data.code);
                setPosts(response.data.posts);
                setHasPosts(response.data.posts.length > 0);
            })
            .catch((error) => navigate('/error'))
    }

    return (
        <div className="EmployeesComponent">
            {show &&
                <InviteEmployeeComponent workspaceCode={workspaceCode} setShow={setShow} />
            }
            <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-10 text-end">
                    <button type="button" className="btn btn-outline-success text-end mx-5 px-4 mb-4" onClick={() => setShow(true)}>Invite</button>
                    <table className="table">
                        <tbody> 
                            {hasUserJoinWorkspaces &&
                                userJoinWorkspaces.map(
                                    userJoinWorkspace => (
                                        <tr key={userJoinWorkspace.userJoinWorkspaceId}>
                                            <td>
                                                <EmployeeComponent userJoinWorkspace={userJoinWorkspace} hasPosts={hasPosts} posts={posts} workspaceCode={workspaceCode} id={id} />
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