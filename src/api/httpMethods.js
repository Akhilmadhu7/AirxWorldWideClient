import axiosInstance from "./axiosInterceptor";

export const httpGet = async ({ url, params = {} }) => {
  const response = await axiosInstance.get(url, { params });
  return response?.data || [];
};

export const httpPost = async ({ url, data }) => {
  const response = await axiosInstance.post(url, data);
  console.log("httpPost response:", response);
  return response?.data || {};
};

export const httpPatch = async ({ url, data }) => {
  const response = await axiosInstance.patch(url, data);
  return response?.data || {};
};

export const httpDelete = async ({ url }) => {
  const response = await axiosInstance.delete(url);
  return response?.data || {};
};