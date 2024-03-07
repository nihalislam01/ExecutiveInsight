import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveUserApi, retrieveWorkspaceByIdApi } from "../api/ExecutiveInsightApiService";
import { useAuth } from "../security/AuthContext";
import CreateWorkspaceComponent from "./CreateWorkspaceComponent";

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

    return (
        <div className="WorkspaceComponent">
            {!hasWorkspace && !isWorkspaceProfile &&
                <CreateWorkspaceComponent />
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