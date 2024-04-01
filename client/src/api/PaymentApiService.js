import { apiClient } from "./ApiClient";

export const paymentServiceApi = (payment) => apiClient.post(`/create-payment`, payment);