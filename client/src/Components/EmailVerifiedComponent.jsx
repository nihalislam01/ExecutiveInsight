import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { verifyEmailApi } from "./api/ExecutiveInsightApiService";


export default function EmailVerifiedComponent() {


    const [message, setMessage] = useState('');
    const { token, isForgotPassword } = useParams();
    const navigate = useNavigate();

    useEffect(() => verifyEmail(), []);

    function verifyEmail() {
        verifyEmailApi(token, isForgotPassword)
            .then((response) => setStatus(response))
            .catch((error) => setStatus(error))
    }

    function setStatus(response) {
        if (isForgotPassword==='true') {
            const email = response.data;
            navigate("/reset-password", {state: {email}});
        } else {
            setMessage(response.data)
        }
    }

    return (
        <div className="EmailVerifiedComponent">
            <h1>{message}</h1>
        </div>
    )
}