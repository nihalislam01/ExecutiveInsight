import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

import { verifyEmailApi } from "../../api/ExecutiveInsightApiService";


export default function EmailVerifiedComponent() {


    const [message, setMessage] = useState('');
    const { token, isForgotPassword } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        verifyEmailApi(token, isForgotPassword)
            .then((response) => {
                if (isForgotPassword==='true') {
                    const email = response.data;
                    navigate("/reset-password", {state: {email}});
                } else {
                    setMessage(response.data)
                }
                console.log(response)
            })
            .catch((error) => setMessage(error.response.data))
    }, [isForgotPassword, token, navigate]);

    return (
        <div className="EmailVerifiedComponent">
            <h1>{message}</h1>
        </div>
    )
}