import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '../../api/ExecutiveInsightApiService';

export default function ResetPasswordComponent() {

    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [showAlert, setAlert] = useState(false);
    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state!=null) {
            setUsername(location.state.email);
        } else {
            navigate('/error');
        }
    }, [location.state, navigate])

    const handleSubmit = async () => {
        if (password===matchPassword) {
            const user = {
                name: '',
                email: username,
                password: password,
                bio: '',
                location: ''
            }
            await resetPasswordApi(user)
                .then((response) => toast.success("Password reset successful"))
                .catch((error) => toast.success("Error resetting password"))
        } else {
            setAlertColor('alert alert-danger');
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value!==matchPassword) {
            setAlertColor('alert alert-warning');
            setMessage('Password did not match');
        } else {
            setAlertColor('alert alert-success');
            setMessage('Password matched');
        }
    }

    const handleMatchPasswordChange = (event) => {
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
        <div className="background-01">
            <Toaster />
            <div className='d-flex justify-content-center mt-5'>
                <div style={{ width: "600px" }}>
                    {showAlert && <div className={alertColor}>{message}</div>}
                    <div className="card">
                        <div className="card-header">Reset Password</div>
                        <div className="card-body">
                            <div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" name="password" placeholder='Password' value={password} onChange={handlePasswordChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" name="matchPassword" placeholder='Enter Password Again' value={matchPassword} onChange={handleMatchPasswordChange} required />
                                </div>
                                <button type="button" className="button-02" onClick={handleSubmit}>Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}