import { useState } from 'react'
import toast, {Toaster} from 'react-hot-toast';

import { userSignupApi } from '../../api/ExecutiveInsightApiService';

export default function SignupComponent() {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [showError, setError] = useState(false);


    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
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

    const handleSubmit = () => {
        if (password===matchPassword) {
            const user = {
                name: name,
                email: username,
                password: password,
                bio: '',
                location: ''
            }
            toast.promise(
                userSignupApi(user),
                 {
                   loading: 'Sending...',
                   success: <b>Email Sent. Check to verify</b>,
                   error: <b>Email already exists</b>,
                 }
            );
            setError(false)
        } else {
            toast.error("Password did not match")
        }
    }

    return (
        <div className='background-01'>
            <Toaster />
            <div className="d-flex justify-content-center">
                <div className="mt-5" style={{width: "600px"}}>
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
                                <button className="button-02" onClick={handleSubmit}>Signup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}