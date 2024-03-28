import { apiClient } from "./ApiClient";

//Signup API
export const userSignupApi = (user) => apiClient.post("/signup", user);
export const verifyEmailApi = (token, isForgotPassword) => apiClient.get(`/verify-email/${token}/${isForgotPassword}`);

//User API
export const retrieveUserApi = (email) => apiClient.get(`/get-user/${email}`);
export const retrieveUserByIdApi = (id) => apiClient.get(`/get-user-by-id/${id}`);
export const forgotPasswordApi = (email) => apiClient.post("/forgot-password", email);
export const resetPasswordApi = (user) => apiClient.patch("/reset-password", user);
export const updateProfileInfoApi = (user) => apiClient.patch("/update-profile", user);
export const uploadPhotoApi = (imageData) => apiClient.patch("/upload-photo", imageData);
export const changePasswordApi = (password) => apiClient.patch("/change-password", password);
export const retrieveWorkspacesByUserForViewApi = (id) => apiClient.get(`/get-workspaces-for-view/${id}`);

//Workspace API
export const retrieveBusinessTitlesApi = () => apiClient.get("/get-business-title");
export const createWorkspaceApi = (workspace) => apiClient.post("/create-workspace", workspace);
export const joinWorkspaceApi = (code, email) => apiClient.post(`/join-workspace/${code}/${email}`);
export const retrieveWorkspaceByIdApi = (id) => apiClient.get(`/get-workspace/${id}`);
export const retrieveWorkspacesByUserApi = (email) => apiClient.get(`/get-workspaces/${email}`);
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
export const assignUserToTeamApi = (email, teamId) => apiClient.patch(`/join-team/${email}/${teamId}`)

//Product API
export const retrieveProductsApi = (id) => apiClient.get(`/get-products/${id}`);
export const createProductApi = (product) => apiClient.post("/create-product", product);
export const changeProductNameApi = (product) => apiClient.patch("/change-product-name", product);
export const deleteProductApi = (id) => apiClient.delete(`/delete-product/${id}`);

//Task API
export const retrieveTasksApi = (id) => apiClient.get(`/get-tasks/${id}`);
export const retrieveTaskApi = (id) => apiClient.get(`get-task/${id}`);
export const createTaskApi = (task) => apiClient.post("/create-task", task);
export const editTaskApi = (task) => apiClient.patch("/update-task", task);
export const assignTaskToMemberApi = (userId, taskId) => apiClient.put(`/assign-task-to-user/${userId}/${taskId}`);
export const assignTaskToTeamApi = (teamId, taskId) => apiClient.put(`/assign-task-to-team/${teamId}/${taskId}`);