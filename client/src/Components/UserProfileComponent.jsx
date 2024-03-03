import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveUserApi } from "./api/ExecutiveInsightApiService";
import { useAuth } from './security/AuthContext';

export default function UserProfileComponent() {

    const [userName, setUserName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [hasPhoto, setHasPhoto] = useState(false);

    const navigate = useNavigate();
    const authContext = useAuth();
    const username = authContext.username();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh()
        retrieveUserApi(username)
            .then((response) => {
                setUserName(response.data.name)
                if (response.data.photo!==null) {
                    setPhoto(URL.createObjectURL(response.data.photo));
                    setHasPhoto(true);
                }
            })
            .catch((error) => navigate('/error'));
    }

    return (
        <div className="UserProfileComponent">
            <div className="container">
                <h2 className="text-start">{userName}</h2>
            </div>
        </div>
    )
}