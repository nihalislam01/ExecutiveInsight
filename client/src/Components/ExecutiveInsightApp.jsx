import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/ExecutiveInsightApp.css'
import HeaderComponent from './HeaderComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import SignupComponent from './SignupComponent';
import ErrorComponent from './ErrorComponent';
import MessageComponent from './MessageComponent';
import HomeComponent from './HomeComponent';
import MyWorkspaceComponent from './MyWorkspaceComponent';
import CreateWorkspaceFormComponent from './CreateWorkspaceFormComponent';
import EmailVerifiedComponent from './EmailVerifiedComponent';
import ForgotPasswordComponent from './ForgotPasswordComponent';
import ResetPasswordComponent from './ResetPasswordComponent'
import CodeFormComponent from './CodeFormComponent';
import AuthProvider, { useAuth } from './security/AuthContext';

function AuthenticatedRoute({children}) {
    const authContext = useAuth();
    if (authContext.isAuthenticated())
        return children
    return <Navigate to="/" />
}

export default function ExecutiveInsightApp() {
    return (
        <div className="ExecutiveInsightApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/signup' element={<SignupComponent />} />
                        <Route path='/forgot-password' element={<ForgotPasswordComponent />} />
                        <Route path='/reset-password' element={<ResetPasswordComponent />} />
                        <Route path='/verify-email/:token/:isForgotPassword' element={<EmailVerifiedComponent />} />
                        <Route path='/message' element={<MessageComponent />} />

                        <Route path='/home' element={
                            <AuthenticatedRoute>
                                <HomeComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/my-workspace' element={
                            <AuthenticatedRoute>
                                <MyWorkspaceComponent />
                            </AuthenticatedRoute>
                        } />


                        <Route path='/create-workspace' element={
                            <AuthenticatedRoute>
                                <CreateWorkspaceFormComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/workspace-code' element={
                            <AuthenticatedRoute>
                                <CodeFormComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/logout' element={<LogoutComponent />} />
                        <Route path='*' element={<ErrorComponent />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}