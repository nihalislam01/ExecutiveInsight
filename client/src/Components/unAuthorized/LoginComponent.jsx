import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from "react-hot-toast";

import { useAuth } from '../../security/AuthContext';

export default function LoginComponent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const authContext = useAuth();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async () => {
        if(await authContext.login(username, password)) {
            window.location.href = '/my-workspace';
        }else{
            toast.error("Authentication failed")
        }
    }

    const handleForgotPassword = () => {
        navigate("/forgot-password")
    }

    return (
        <div className='background-08'>
            <Toaster />
                <div className="d-flex justify-content-center">
                    <div className='mt-5' style={{width: "600px"}}>
                        <div className='card'>
                            <div className="card-header">
                                <h3 className="card-title">Sign in</h3>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" name="username" placeholder='Email' value={username} onChange={handleUsernameChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" name="password" placeholder='Password' value={password} onChange={handlePasswordChange} required />
                                    </div>
                                    <button className="button-03" onClick={handleSubmit}>Sign in</button>
                                    <button className='btn btn-link' onClick={handleForgotPassword}>Forgot Password?</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}