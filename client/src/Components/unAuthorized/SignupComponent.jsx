import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { userSignupApi } from '../../api/ExecutiveInsightApiService';
import '../../styles/SignComponent.css'

export default function SignupComponent() {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [showError, setError] = useState(false);
    const navigate = useNavigate();  


    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
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
        setError(true);
        setMatchPassword(event.target.value)
        if (event.target.value!==password) {
            setAlertColor('alert alert-warning');
            setMessage('Password did not match');
        } else {
            setAlertColor('alert alert-success');
            setMessage('Password matched');
        }
    }

    async function handleSubmit() {
        if (password===matchPassword) {
            const user = {
                name: name,
                email: username,
                password: password,
                bio: '',
                location: ''
            }
            await userSignupApi(user)
                .then((response) => setStatus(response))
                .catch((error) => setStatus(error))
        } else {
            setError(true);
            setAlertColor('alert alert-danger');
            setMessage('Password did not match');
        }
    }

    function setStatus(response) {
        if (response.status===200) {
            var newMessage = "Register successful. Check your email to verify.";
            navigate('/message', { state: { newMessage } });
        } else if (response.response.status===409) {
            setError(true);
            setAlertColor('alert alert-warning');
            setMessage('Email already exists');
        } else {
            setError(true);
            setAlertColor('alert alert-warning');
            setMessage('Something went wrong. Please try again.');
        }
    }

    return (
        <div className="container my-5 Login sign">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {showError && <div className={alertColor}>{message}</div>}
                    <div className='card'>
                        <div className="card-header">
                            <h3 className="card-title">Sign up</h3>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder='Full Name' name="name" value={name} onChange={handleNameChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" name="username" placeholder='Email' value={username} onChange={handleUsernameChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" name="password" placeholder='Password' value={password} onChange={handlePasswordChange} required />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" name="matchPassword" placeholder='Enter Password Again' value={matchPassword} onChange={handleMatchPasswordChange} required />
                                </div>
                                <button type="button" className="btn btn-success form-control" onClick={handleSubmit}>Signup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}