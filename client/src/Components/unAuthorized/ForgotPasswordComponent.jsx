import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

import { forgotPasswordApi } from '../../api/ExecutiveInsightApiService';

export default function ForgotPasswordComponent() {

    const [username, setUsername] = useState('');

    function sendEmail() {
        const email = {
            email: username
        }
        toast.promise(
            forgotPasswordApi(email),
                {
                loading: 'Sending...',
                success: <b>Email Sent</b>,
                error: <b>Email does not exists</b>,
                }
            );
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    return (
        <div className="FormComponent">
            <Toaster />
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className="card">
                        <div className="card-header">Forgot Password</div>
                        <div className='card-body'>
                            <label className='m-0'>Enter your email</label>
                            <input type="email" className="form-control" value={username} onChange={handleUsernameChange} required />
                            <hr />
                            <button className='btn btn-success form-control' onClick={sendEmail}>Send verification email</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}