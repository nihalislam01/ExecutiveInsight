import { apiClient } from "./ApiClient";

//Signup API
export const userSignupApi = (user) => apiClient.post("/signup", user);
export const verifyEmailApi = (token, isForgotPassword) => apiClient.get(`/verify-email/${token}/${isForgotPassword}`);

//User API
export const retrieveUserApi = (email) => apiClient.get(`/get-user/${email}`);
export const forgotPasswordApi = (email) => apiClient.post("/forgot-password", email);
export const resetPasswordApi = (user) => apiClient.patch("/reset-password", user);

//Workspace API
export const retrieveBusinessTitlesApi = () => apiClient.get("/get-business-title");
export const createWorkspaceApi = (workspace) => apiClient.post("/create-workspace", workspace);
export const retrieveWorkspaceByIdApi = (id) => apiClient.get(`/get-workspace/${id}`);
export const retrieveWorkspacesByUserApi = (email) => apiClient(`/get-workspaces/${email}`);
export const joinWorkspaceApi = (code, email) => apiClient.patch(`/join-workspace/${code}/${email}`);
export const retrieveUsersByWorkspaceIdApi = (id) => apiClient.get(`/get-users/${id}`);

//Notification API
export const retrieveNotificationByUserApi = (email) => apiClient(`/get-notifications/${email}`);
export const sendInviteApi = (email, code) => apiClient.post(`/send-invite/${code}/${email}`);
export const updateNotificationApi = (notification) => apiClient.patch("/update-notification", notification);

//Post API
export const addCustomPostApi = (post) => apiClient.post("/add-custom-post", post);
export const deletePostApi = (id, title) => apiClient.delete(`/delete-post/${id}/${title}`);