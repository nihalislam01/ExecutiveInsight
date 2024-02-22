import { apiClient } from "./ApiClient";

export const retrieveHelloWorld = () => apiClient.get('/hello-world');