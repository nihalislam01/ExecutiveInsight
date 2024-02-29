import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinWorkspaceApi } from './api/ExecutiveInsightApiService';
import { useAuth } from './security/AuthContext';

export default function CodeFormComponent() {

    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [showAlert, setAlert] = useState(false);
    const authContext = useAuth();
    const username = authContext.username();
    const navigate = useNavigate();

    function handleSubmit() {
        joinWorkspaceApi(code, username)
            .then((response) => handleResponse(response))
            .catch((error) => handleResponse(error))
    }

    function handleResponse(response) {
        if (response.status===200) {
            navigate('/home');
        } else {
            setMessage(response.response.data);
            setAlert(true);
        }
    }

    function handleCodeChange(event) {
        setCode(event.target.value);
    }

    return (
        <div className="CodeFormComponent">
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    {showAlert && <div className='alert alert-warning'>{message}</div>}
                    <div className="card">
                        <div className="card-header">Enter workspace code</div>
                        <div className="card-body">
                            <div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" name="code" value={code} onChange={handleCodeChange} required />
                                </div>
                                <button type="button" className="btn btn-success form-control" onClick={handleSubmit}>Join Workspace</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}