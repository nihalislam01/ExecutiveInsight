import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { retrieveUserApi } from "../api/ExecutiveInsightApiService";

const AuthConext =  createContext()

export const useAuth = () => useContext(AuthConext);

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthentication] = useState(false)
    const [hasWorkspace, setHasWorkspace] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    async function login(username, password) {

        try {
            const response = await executeJwtAuthenticationService(username, password)

            if(response.status===200) {
                const jwtToken = 'Bearer ' + (response.data.token)
                setAuthentication(true);
                setUsername(username);
                setToken(jwtToken);
                apiClient.interceptors.request.use((config) =>{
                    config.headers.Authorization = jwtToken
                    return config
                })
                if (response.data.user.workspace!=null) {
                    setHasWorkspace(true);
                }
                return true;
            }else{
                logout();
                return false;
            }
        } catch(error) {
            logout();
            return false;
        }
    }

    function logout() {
        setAuthentication(false);
        setToken(null);
        setUsername(null);
    }

    async function updateHasWorkspace() {
        await retrieveUserApi(username)
        .then((response) => {
            if (response.data.workspace!=null) {
                setHasWorkspace(true)
            }
        })
        .catch((error) => logout())
    }

    return (
        <AuthConext.Provider value={ {isAuthenticated, login, logout, username, token, hasWorkspace, updateHasWorkspace} } >
            {children}
        </AuthConext.Provider>
    )
}