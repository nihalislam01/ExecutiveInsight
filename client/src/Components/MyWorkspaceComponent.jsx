import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveUserApi } from "./api/ExecutiveInsightApiService";
import { useAuth } from "./security/AuthContext";

export default function MyWorkspaceComponent() {

    const [workspace, setWorkspace] = useState({})
    const authContext = useAuth();
    const navigate = useNavigate();
    const hasWorkspace = authContext.hasWorkspace;
    const username = authContext.username;

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        retrieveUserApi(username)
            .then((response) => 
            {
                if (hasWorkspace) {
                    setWorkspace(response.data.workspace)
                }
            })
            .catch((error) => navigate('/error'))
    }

    function goToCreateWorkspace() {
        navigate('/create-workspace');
    }

    return (
        <div className="MyWorkspaceComponent">
            {!hasWorkspace && <h1>Start your business journey by creating your own workspace</h1>}
            {!hasWorkspace && <div><button className="btn btn-success" onClick={goToCreateWorkspace}>Create Your Workspace</button></div>}
            {hasWorkspace && <h1>{workspace.name}</h1>}
        </div>
    )
}