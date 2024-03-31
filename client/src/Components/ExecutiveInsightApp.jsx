import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import '../styles/ExecutiveInsightApp.css'

//Unauthorized Components
import HeaderComponent from './common/HeaderComponent';
import MessageComponent from './common/MessageComponent';
import ErrorComponent from './common/ErrorComponent';
import LogoutComponent from './common/LogoutComponent';

import SignupComponent from './unAuthorized/SignupComponent';
import EmailVerifiedComponent from './unAuthorized/EmailVerifiedComponent';
import LoginComponent from './unAuthorized/LoginComponent';
import ForgotPasswordComponent from './unAuthorized/ForgotPasswordComponent';
import ResetPasswordComponent from './unAuthorized/ResetPasswordComponent';

//Authorized Components
import HomeComponent from './authorized/HomeComponent';
import UserProfileComponent from './authorized/Profile/UserProfileComponent';
import EditProfileComponent from './authorized/Profile/EditProfileComponent';
import ChangePhotoComponent from './authorized/Profile/ChangePhotoComponent';
import ProfileViewComponent from './authorized/Profile/ProfileViewComponent';
import WorkspaceProfileComponent from './authorized/workspaceProfile/WorkspaceProfileComponent';

//Admin Components
import WorkspaceComponent from './admin/Workspace/WorkspaceComponent';
import SidebarComponent from './admin/Workspace/SidebarComponent';
import ListMemberComponent from './admin/Member/ListMemberComponent';
import ListPostComponent from './admin/Post/ListPostComponent';
import ListTeamComponent from './admin/Team/ListTeamComponent';
import ListProductComponent from './admin/Product/ListProductComponent';
import ListTaskComponent from './admin/Task/ListTaskComponent';
import TaskProfileComponent from './admin/Task/TaskProfileComponent';
import TeamProfileComponent from './admin/Team/TeamProfileComponent';

import AuthProvider, { useAuth } from '../security/AuthContext';

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

                        <Route path='/team/:id' element={
                            <AuthenticatedRoute>
                                    <TeamProfileComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/members/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <SidebarComponent />
                                    <ListMemberComponent />
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

                        <Route path='/products/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <SidebarComponent />
                                    <ListProductComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/tasks/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <SidebarComponent />
                                    <ListTaskComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/task/:workspaceId/:taskId' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <SidebarComponent />
                                    <TaskProfileComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/workspace-profile/:id' element={
                            <AuthenticatedRoute>
                                <WorkspaceProfileComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/user-profile' element={
                            <AuthenticatedRoute>
                                <UserProfileComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/user/:id' element={
                            <AuthenticatedRoute>
                                <ProfileViewComponent />
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