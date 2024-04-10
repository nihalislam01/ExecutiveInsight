import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

import { forgotPasswordApi } from '../../api/ExecutiveInsightApiService';

export default function ForgotPasswordComponent() {

    const [username, setUsername] = useState('');

    const sendEmail = () => {
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

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    return (
        <div className="background-01">
            <Toaster />
            <div className='d-flex justify-content-center mt-5'>
                <div style={{width: "600px"}}>
                    <div className="card">
                        <div className="card-header">Forgot Password</div>
                        <div className='card-body'>
                            <input type="email" className="form-control" value={username} placeholder="Enter your email" onChange={handleUsernameChange} required />
                            <hr />
                            <button className='button-05' onClick={sendEmail}>Send verification email</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}