// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { retrieveWorkspaceApi } from './api/ExecutiveInsightApiService';
import { useAuth } from './security/AuthContext';

export default function HomeComponent() {

    // const [workspaces, setWorkspaces] = useState([]);
    const authContext = useAuth();
    const username = authContext.username();
    // const navigate = useNavigate();

    // useEffect(() => refreshWorkspace(), [])

    // function refreshWorkspace() {
    //     const email = {
    //         email: username
    //     }
    //     retrieveWorkspaceApi(email)
    //         .then((response) => setWorkspaces(response.data))
    //         .catch((error) => navigate("/error"))
    // }


    return (
        <div className="HomeComponent">
            <h1>Welcome {username}</h1>
        </div>
    )
}