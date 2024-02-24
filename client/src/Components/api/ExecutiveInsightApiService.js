import { apiClient } from "./ApiClient";

export const userSignupApi = (user) => apiClient.post("/signup", user);
export const retrieveUserApi = (email) => apiClient.get(`/get-user/${email}`);
export const verifyEmailApi = (token, isForgotPassword) => apiClient.get(`/verify-email/${token}/${isForgotPassword}`);
export const forgotPasswordApi = (email) => apiClient.post("/forgot-password", email);
export const resetPasswordApi = (user) => apiClient.patch("/reset-password", user);
export const retrieveWorkspaceApi = (email) => apiClient.get("/get-workspace", email);
export const createWorkspaceApi = (workspace) => apiClient.post("create-workspace", workspace);