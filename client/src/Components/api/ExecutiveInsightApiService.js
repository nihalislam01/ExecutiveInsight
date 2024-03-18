import { apiClient } from "./ApiClient";

//Signup API
export const userSignupApi = (user) => apiClient.post("/signup", user);
export const verifyEmailApi = (token, isForgotPassword) => apiClient.get(`/verify-email/${token}/${isForgotPassword}`);

//User API
export const retrieveUserApi = (email) => apiClient.get(`/get-user/${email}`);
export const forgotPasswordApi = (email) => apiClient.post("/forgot-password", email);
export const resetPasswordApi = (user) => apiClient.patch("/reset-password", user);
export const updateProfileInfoApi = (user) => apiClient.patch("/update-profile", user);
export const uploadPhotoApi = (imageData) => apiClient.patch("/upload-photo", imageData);
export const changePasswordApi = (password) => apiClient.patch("/change-password", password);

//Workspace API
export const retrieveBusinessTitlesApi = () => apiClient.get("/get-business-title");
export const createWorkspaceApi = (workspace) => apiClient.post("/create-workspace", workspace);
export const joinWorkspaceApi = (code, email) => apiClient.post(`/join-workspace/${code}/${email}`);
export const retrieveWorkspaceByIdApi = (id) => apiClient.get(`/get-workspace/${id}`);
export const retrieveWorkspacesByUserApi = (email) => apiClient(`/get-workspaces/${email}`);
export const retrieveUsersByWorkspaceIdApi = (id) => apiClient.get(`/get-users/${id}`);

//Notification API
export const retrieveNotificationByUserApi = (email) => apiClient(`/get-notifications/${email}`);
export const requestJoinApi = (userJoinWorkspace) => apiClient.post("/request-join", userJoinWorkspace);
export const inviteJoinApi = (userJoinWorkspace) => apiClient.post("/invite-join", userJoinWorkspace);
export const updateNotificationApi = (notification) => apiClient.patch("/update-notification", notification);

//Post API
export const addCustomPostApi = (post) => apiClient.post("/add-custom-post", post);
export const deletePostApi = (id, title) => apiClient.delete(`/delete-post/${id}/${title}`);
export const assignUserToPostApi = (email, code, postId) => apiClient.patch(`/assign-post/${email}/${code}/${postId}`);
export const retrieveUsersByWorkspaceAndPostApi = (workspaceId, postId) => apiClient.get(`/get-post-users/${workspaceId}/${postId}`);

//Team API
export const createTeamApi = (team) => apiClient.post("/create-team", team);