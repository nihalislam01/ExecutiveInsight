import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function MessageComponent() {


    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        if(location.state!=null) {
            setMessage(location.state.newMessage);
        } else {
            navigate("/error");
        }
    }, [location.state, navigate])

    return (
        <div className="MessageComponent">
            <h1>{message}</h1>
        </div>
    )
}