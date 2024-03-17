import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveUsersByWorkspaceIdApi, retrieveWorkspaceByIdApi } from "../api/ExecutiveInsightApiService";
import EmployeeComponent from "./EmployeeComponent";
import InviteEmployeeComponent from "./InviteEmployeeComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
                    <h2 className="text-start mx-3">Members</h2>
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
                            <tr>
                                <td>
                                    <button type="button" className="btn form-control py-2" onClick={() => setShow(true)} style={{ backgroundColor: "#e9ecef" }}><FontAwesomeIcon icon={faPlus} /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}