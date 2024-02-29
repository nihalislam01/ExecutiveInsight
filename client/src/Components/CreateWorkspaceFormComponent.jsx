import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkspaceApi, retrieveBusinessTitlesApi } from './api/ExecutiveInsightApiService';
import { useAuth } from "./security/AuthContext";

export default function CreateWorkspaceFormComponent() {

    const [workspaceName, setWorkspaceName] = useState('');
    const [titles, setTitles] = useState(null);
    const [businessTitle, setBusinessTitle] = useState("manufacturing Company");
    const [hasTitles, setHasTitles] = useState(false);
    const authContext = useAuth();
    const username = authContext.username();
    const navigate = useNavigate();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh()
        retrieveBusinessTitlesApi()
            .then((response) => {
                setTitles(response.data)
                setHasTitles(response.data.length > 0)
            })
            .catch((error) => navigate("/error"))
    }

    function handleSubmit() {
        const workspace = {
            name: workspaceName,
            email: username,
            title: businessTitle
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

    function handleTitle(event) {
        setBusinessTitle(event.target.value);
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
                                <div className="mb-3">
                                    <label className="form-label">Select Business</label>
                                    <select className="form-select" onChange={handleTitle}>
                                        { hasTitles &&
                                            titles.map(
                                                title => (
                                                    <option key={title.businessTitleId} value={title.title}>{title.title}</option>
                                                )
                                            )
                                        }
                                    </select>
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