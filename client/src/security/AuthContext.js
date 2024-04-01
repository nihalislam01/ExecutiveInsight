import Cookies from "js-cookie";
import { createContext, useContext } from "react";

import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

const AuthConext =  createContext()

export const useAuth = () => useContext(AuthConext);

export default function AuthProvider({ children }) {

    async function login(username, password) {

        try {
            const response = await executeJwtAuthenticationService(username, password)

            if(response.status===200) {
                const jwtToken = 'Bearer ' + (response.data.token)
                Cookies.set('jwtToken', jwtToken, {expires: 1});
                Cookies.set('username', username, {expires: 1})
                apiClient.interceptors.request.use((config) =>{
                    config.headers.Authorization = jwtToken
                    return config
                })
                if (response.data.user.role==='ADMIN') {
                    Cookies.set('isAdmin', true, {expires: 1});
                } else if (response.data.user.role==='CONSUMER') {
                    Cookies.set('isConsumer', true, {expires: 1});
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
        Cookies.remove('jwtToken');
        Cookies.remove('isAdmin');
        Cookies.remove('username');
        Cookies.remove('isConsumer');
    }

    const setConsumer = () => {
        Cookies.set('isConsumer', true, {expires: 1});
    }

    const setAdmin = () => {
        Cookies.remove('isConsumer');
        Cookies.set('isAdmin', true, {expires: 1});
    }

    function username() {
        if (Cookies.get('username')===undefined) {
            return null;
        }
        return Cookies.get('username');
    }

    function isAuthenticated() {
        if (Cookies.get('jwtToken')===undefined) {
            return false;
        }
        return true;
    }

    function isAdmin() {
        if (Cookies.get('isAdmin')===undefined) {
            return false;
        }
        return true;
    }

    function isConsumer() {
        if (Cookies.get('isConsumer')===undefined) {
            return false;
        }
        return true;
    }

    function refresh() {
        if (Cookies.get('jwtToken')===undefined) {
            logout();
        } else {
            apiClient.interceptors.request.use((config) =>{
                config.headers.Authorization = Cookies.get('jwtToken');
                return config
            })
        }
    }

    return (
        <AuthConext.Provider value={ {login, logout, username, isAuthenticated, isAdmin, refresh, isConsumer, setAdmin, setConsumer} } >
            {children}
        </AuthConext.Provider>
    )
}