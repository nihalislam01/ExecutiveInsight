import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

export default function LoginComponent() {

    const [username, setUsername] = useState('nihalislam2@gmail.com');
    const [password, setPassword] = useState('dummy');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [alertMessage, setAlertMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit() {
        if(await authContext.login(username, password)) {
            navigate("/home")
        }else{
            setAlertMessage(true);
            setAlertColor('alert alert-danger');
            setMessage('Authentication Failed');
        }
    }

    function handleForgotPassword() {
        navigate("/forgot-password")
    }

    return (
        <div className="container mt-5 Login">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {alertMessage && <div className={alertColor}>{message}</div>}
                    <div className='card'>
                        <div className="card-header">
                            <h3 className="card-title">Login</h3>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input type="email" className="form-control" name="username" value={username} onChange={handleUsernameChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password" value={password} onChange={handlePasswordChange} required />
                                </div>
                                <button type="button" className="btn btn-primary form-control login" onClick={handleSubmit}>Login</button>
                                <button type='button' className='btn btn-link' onClick={handleForgotPassword}>Forgot Password?</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}