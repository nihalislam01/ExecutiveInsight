import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/ExecutiveInsightApp.css'

//Unauthorized Components
import HeaderComponent from './HeaderComponent';
import SignupComponent from './SignupComponent';
import EmailVerifiedComponent from './EmailVerifiedComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import ForgotPasswordComponent from './ForgotPasswordComponent';
import ResetPasswordComponent from './ResetPasswordComponent';
import MessageComponent from './MessageComponent';
import ErrorComponent from './ErrorComponent';

//Authorized Components
import HomeComponent from './HomeComponent';
import UserProfileComponent from './UserProfileComponent';
import EditProfileComponent from './EditProfileComponent';
import ChangePhotoComponent from './ChangePhotoComponent';

//Admin Components
import WorkspaceComponent from './MyWorkspace/WorkspaceComponent';
import SidebarComponent from './MyWorkspace/SidebarComponent';
import ListEmployeeComponent from './MyWorkspace/ListEmployeeComponent';
import ListPostComponent from './MyWorkspace/ListPostComponent';
import ListTeamComponent from './MyWorkspace/ListTeamComponent';

import AuthProvider, { useAuth } from './security/AuthContext';

function AuthenticatedRoute({children}) {
    const authContext = useAuth();
    if (authContext.isAuthenticated())
        return children
    return <Navigate to="/" />
}

function AdminRoute({children}) {
    const authContext = useAuth();
    if (authContext.hasWorkspace())
        return children
    return <Navigate to="/home" />
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
                                <SidebarComponent />
                                <WorkspaceComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/teams/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <SidebarComponent />
                                    <ListTeamComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/members/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <SidebarComponent />
                                    <ListEmployeeComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/posts/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <SidebarComponent />
                                    <ListPostComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/workspace-profile/:id' element={
                            <AuthenticatedRoute>
                                <WorkspaceComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/user-profile' element={
                            <AuthenticatedRoute>
                                <UserProfileComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/user-profile/edit' element={
                            <AuthenticatedRoute>
                                <EditProfileComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/user-profile/edit/photo' element={
                            <AuthenticatedRoute>
                                <ChangePhotoComponent />
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