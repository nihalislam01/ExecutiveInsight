import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkspaceApi } from './api/ExecutiveInsightApiService';
import { useAuth } from "./security/AuthContext";

export default function CreateWorkspaceFormComponent() {

    const [workspaceName, setWorkspaceName] = useState('');
    const authContext = useAuth();
    const username = authContext.username();
    const navigate = useNavigate();

    function handleSubmit() {
        const workspace = {
            name: workspaceName,
            email: username
        }
        createWorkspaceApi(workspace)
            .then((response) => handleResponse(response))
            .catch((error) => navigate("/error"))
    }

    function handleResponse(response) {
        Cookies.set('hasWorkspace', true, {expires: 1});
        var newMessage = "You have successfully created your own workspace";
        navigate("/message", { state: { newMessage } });
    }

    function handleNameChange(event) {
        setWorkspaceName(event.target.value);
    }

    return (
        <div className="FormComponent">
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className="card">
                        <div className="card-header">Create you workspace</div>
                        <div className="card-body">
                            <div>
                                <div className="mb-3">
                                    <label className="form-label">Workspace Name</label>
                                    <input type="text" className="form-control" name="workspaceName" value={workspaceName} onChange={handleNameChange} required />
                                </div>
                                <button type="button" className="btn btn-success form-control" onClick={handleSubmit}>Create Workspace</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}