import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: location.protocol + "//" + location.hostname + ":8080",
  // リクエストヘッダ
  headers: {
    "Content-type": "application/json",
  },
});

export function setAuthHeader(token: string) {
  apiClient.defaults.headers.common["Authorization"] = token;
}

export function removeAuthHeader() {
  apiClient.defaults.headers.common["Authorization"] = "";
}

export async function get<T, K>(url: string, data: K): Promise<T> {
  return await (
    await apiClient.get<T>(url, { params: data })
  ).data;
}

export async function post<T, K>(url: string, data: K): Promise<T> {
  return (await apiClient.post<T>(url, data)).data;
}

export const apiPrefix = "api/";
