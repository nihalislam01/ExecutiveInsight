import { apiClient } from "./ApiClient";

//Signup API
export const userSignupApi = (user) => apiClient.post("/signup", user);
export const verifyEmailApi = (token, isForgotPassword) => apiClient.get(`/verify-email/${token}/${isForgotPassword}`);

//User API
export const retrieveUserApi = (email) => apiClient.get(`/get-user/${email}`);
export const forgotPasswordApi = (email) => apiClient.post("/forgot-password", email);
export const resetPasswordApi = (user) => apiClient.patch("/reset-password", user);

//Workspace API
export const retrieveWorkspaceByIdApi = (id) => apiClient.get(`/get-workspace-by-id/${id}`)
export const retrieveWorkspaceByCodeApi = (code) => apiClient.get(`/get-workspace-by-code/${code}`)
export const retrieveUsersByWorkspaceIdApi = (id) => apiClient.get(`/get-users/${id}`)
export const createWorkspaceApi = (workspace) => apiClient.post("/create-workspace", workspace);
export const joinWorkspaceApi = (code, email) => apiClient.patch(`/join-workspace/${code}/${email}`);
export const retrieveBusinessTitlesApi = () => apiClient.get("/get-business-title");

//Notification API
export const sendInviteApi = (email, code) => apiClient.post(`/send-invite/${code}/${email}`);
export const updateNotificationApi = (notification) => apiClient.patch("/update-notification", notification);