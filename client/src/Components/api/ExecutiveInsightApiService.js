import { apiClient } from "./ApiClient";

//Signup API
export const userSignupApi = (user) => apiClient.post("/signup", user);
export const verifyEmailApi = (token, isForgotPassword) => apiClient.get(`/verify-email/${token}/${isForgotPassword}`);

//User API
export const retrieveUserApi = (email) => apiClient.get(`/get-user/${email}`);
export const forgotPasswordApi = (email) => apiClient.post("/forgot-password", email);
export const resetPasswordApi = (user) => apiClient.patch("/reset-password", user);

//Workspace API
export const retrieveWorkspaceApi = (email) => apiClient.get("/get-workspaces", email);
export const createWorkspaceApi = (workspace) => apiClient.post("/create-workspace", workspace);
export const joinWorkspaceApi = (code, email) => apiClient.patch(`/join-workspace/${code}/${email}`);