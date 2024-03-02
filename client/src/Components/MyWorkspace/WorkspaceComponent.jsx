import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveUserApi, retrieveWorkspaceByIdApi } from "../api/ExecutiveInsightApiService";
import { useAuth } from "../security/AuthContext";

export default function WorkspaceComponent() {

    var workspace = {};
    var staticIsWorkspaceProfile = false;
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceTitle, setWorkspaceTitle] = useState('');
    const [isWorkspaceProfile, setIsWorkspaceProfile] = useState(false);
    const authContext = useAuth();
    const hasWorkspace = authContext.hasWorkspace();
    const username = authContext.username();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh()
        if (id!==undefined) {
            setIsWorkspaceProfile(true);
            staticIsWorkspaceProfile = true;
            retrieveWorkspaceByIdApi(id)
                .then((response) => {
                    workspace = response.data
                    setWorkspaceName(workspace.name)
                    setWorkspaceTitle(workspace.businessTitle.title)
                })
                .catch((error) => {
                    console.log(error)
                    navigate('/error')})
        }
        if (hasWorkspace && !staticIsWorkspaceProfile) {
            retrieveUserApi(username)
                .then((response) => {
                    workspace = response.data.workspace
                    setWorkspaceName(workspace.name)
                    setWorkspaceTitle(workspace.businessTitle.title)
                })
                .catch((error) => {
                    console.log(error)
                    navigate('/error')})
        }

    }

    function goToCreateWorkspace() {
        window.location.href = '/create-workspace';
    }

    return (
        <div className="WorkspaceComponent">
            {!hasWorkspace && !isWorkspaceProfile &&
                <div>
                    <div className="row p-5 m-5 bg-light">
                        <h2 className="col-md-6 text-start">Start your business journey by creating your own workspace</h2>
                        <div className="col-md-6"><button className="btn btn-link" onClick={goToCreateWorkspace}>Create Your Workspace</button></div>
                    </div>
                    <div className="row p-5 m-5 bg-light text-start">
                        <h5>Empower your enterprise with our comprehensive business management solutions</h5>
                        <ul>
                            <li>Manage your teams</li>
                            <li>Monitor your company revenue</li>
                            <li>Monitor your employee progress</li>
                        </ul>
                    </div>
                </div>
             }

            {hasWorkspace && !isWorkspaceProfile && 
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-10">
                        <h1 className="text-start px-4">{workspaceName}</h1>
                    </div>
                </div>
            }

            {isWorkspaceProfile && 
                <div className="container">
                    <div className="text-start">
                        <h1>{workspaceName}</h1>
                        <p>{workspaceTitle}</p>
                    </div>
                </div>
            }
        </div>
    )
}