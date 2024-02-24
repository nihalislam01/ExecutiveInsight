import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordApi } from './api/ExecutiveInsightApiService';

export default function ResetPasswordComponent() {

    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [showAlert, setAlert] = useState(false);
    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => refreshReset(), [])

    function refreshReset() {
        if (location.state!=null) {
            setUsername(location.state.email);
        } else {
            navigate('/error');
        }
    }

    function handleSubmit() {
        const user = {
            name: '',
            email: username,
            password: password
        }
        resetPasswordApi(user)
            .then((response) => handleResponse(response))
            .catch((error) => navigate("/error"))
    }

    function handleResponse(response) {
        var newMessage = "Password Reset Successful";
        navigate("/message", { state: { newMessage } });
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
        if (event.target.value!==matchPassword) {
            setAlertColor('alert alert-warning');
            setMessage('Password did not match');
        } else {
            setAlertColor('alert alert-success');
            setMessage('Password matched');
        }
    }

    function handleMatchPasswordChange(event) {
        setAlert(true);
        setMatchPassword(event.target.value)
        if (event.target.value!==password) {
            setAlertColor('alert alert-warning');
            setMessage('Password did not match');
        } else {
            setAlertColor('alert alert-success');
            setMessage('Password matched');
        }
    }

    return (
        <div className="FormComponent">
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    {showAlert && <div className={alertColor}>{message}</div>}
                    <div className="card">
                        <div className="card-header">Reset Password</div>
                        <div className="card-body">
                            <div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password" value={password} onChange={handlePasswordChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Password Again</label>
                                    <input type="password" className="form-control" name="matchPassword" value={matchPassword} onChange={handleMatchPasswordChange} required />
                                </div>
                                <button type="button" className="btn btn-success form-control" onClick={handleSubmit}>Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}