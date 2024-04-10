import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createWorkspaceApi, retrieveBusinessTitlesApi } from '../../../api/ExecutiveInsightApiService';
import { useAuth } from "../../../security/AuthContext";

export default function WorkspaceFormComponent({ setShow, setSuccess, setError }) {

    const [workspaceName, setWorkspaceName] = useState('');
    const [titles, setTitles] = useState(null);
    const [businessTitle, setBusinessTitle] = useState("Manufacturing Company");
    const [hasTitles, setHasTitles] = useState(false);

    const authContext = useAuth();
    const username = authContext.username();
    
    const navigate = useNavigate();
    const formRef = useRef(null);

    useEffect(() => {
        authContext.refresh()

        const getTitles = async () => {
            await retrieveBusinessTitlesApi()
            .then((response) => {
                setTitles(response.data)
                setHasTitles(response.data.length > 0)
            })
            .catch((error) => navigate("/error"))
        }

        getTitles();

        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShow(false);
            }
        }
            document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [authContext, navigate, setShow])

    const handleSubmit = async () => {
        const workspace = {
            name: workspaceName,
            email: username,
            title: businessTitle
        }
        await createWorkspaceApi(workspace)
            .then((response) => {
                authContext.setAdmin()
                setSuccess();
            })
            .catch((error) => {
                setError();
            })
    }

    const handleNameChange = (event) => {
        setWorkspaceName(event.target.value);
    }

    const handleTitle = (event) => {
        setBusinessTitle(event.target.value);
    }

    return (
        <div className='row justify-content-center position-relative' ref={formRef}>
            <div className='col-md-6 position-absolute'>
                <div className="card shadow">
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
                            <hr />
                            <div className='text-end'>
                                <button type="button" className="btn btn-secondary mx-2" onClick={() => setShow(false)}>Cancel</button>
                                <button type="button" className="btn btn-success" onClick={handleSubmit}>Create Workspace</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}