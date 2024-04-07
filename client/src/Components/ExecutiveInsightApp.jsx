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
import PlanComponent from './unAuthorized/PlanComponent';

//Authorized Components
import HomeComponent from './authorized/HomeComponent';
import UserProfileComponent from './authorized/Profile/UserProfileComponent';
import EditProfileComponent from './authorized/Profile/EditProfileComponent';
import ChangePhotoComponent from './authorized/Profile/ChangePhotoComponent';
import ProfileViewComponent from './authorized/Profile/ProfileViewComponent';
import WorkspaceProfileComponent from './authorized/workspaceProfile/WorkspaceProfileComponent';
import MyTaskComponent from './authorized/MyTaskComponent';

//Admin Components
import WorkspaceComponent from './authorized/Workspace/WorkspaceComponent';
import DashboardComponent from './admin/Dashboard/DashboardComponent';
import TeamComponent from './admin/Team/TeamComponent';
import MemberComponent from './admin/Member/MemberComponent';
import PostComponent from './admin/Post/PostComponent';
import SaleComponent from './admin/Sale/SaleComponent';
import DeliveryDetails from './admin/Sale/DeliveryDetails';
import ProductComponent from './admin/Product/ProductComponent';
import TaskComponent from './admin/Task/TaskComponent';
import TaskProfileComponent from './admin/Task/TaskProfileComponent';
import TeamProfileComponent from './admin/Team/TeamProfileComponent';

import AuthProvider, { useAuth } from '../security/AuthContext';

function AuthenticatedRoute({children}) {
    const authContext = useAuth();
    if (authContext.isAuthenticated())
        return children
    return <Navigate to="/login" />
}

function AdminRoute({children}) {
    const authContext = useAuth();
    if (authContext.isAdmin())
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
                        <Route path='/' element={<PlanComponent />} />
                        <Route path='/plan' element={<PlanComponent />} />
                        <Route path='/verify-email/:token/:isForgotPassword' element={<EmailVerifiedComponent />} />
                        <Route path='/message' element={<MessageComponent />} />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/signup' element={ <SignupComponent />} />
                        <Route path='/forgot-password' element={<ForgotPasswordComponent />} />
                        <Route path='/reset-password' element={<ResetPasswordComponent />} />

                        <Route path='/home' element={
                            <AuthenticatedRoute>
                                <HomeComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/workspace-profile/:id' element={
                            <AuthenticatedRoute>
                                <WorkspaceProfileComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/my-workspace' element={
                            <AuthenticatedRoute>
                                <WorkspaceComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/my-tasks/:id' element={
                            <AuthenticatedRoute>
                                <MyTaskComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/dashboard/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <DashboardComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/teams/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <TeamComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/team/:id/:wId' element={
                            <AuthenticatedRoute>
                                    <TeamProfileComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/members/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <MemberComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/posts/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <PostComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        
                        <Route path='/sales/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <SaleComponent/>
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                    <Route path='/delivery/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <DeliveryDetails />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/products/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <ProductComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/tasks/:id' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <TaskComponent />
                                </AdminRoute>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/task/:workspaceId/:taskId' element={
                            <AuthenticatedRoute>
                                <AdminRoute>
                                    <TaskProfileComponent />
                                </AdminRoute>
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