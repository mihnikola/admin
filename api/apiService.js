// src/api/apiService.js
import { getLanguageValue } from "@/helpers/language";
import { getStorage } from "@/helpers/token";
import axios from "axios";
import { showError } from "@/helpers/error-handler";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000, // Adjust as needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to inject the token and timezone
instance.interceptors.request.use(
  async (config) => {
    const token = await getStorage();
    const languageValue = await getLanguageValue();
    const timeZoneValue = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (timeZoneValue) {
      config.headers["Time-Zone"] = timeZoneValue;
    }
    if (languageValue) {
      config.headers["Language"] = languageValue;
    } else {
      config.headers["Language"] = "sr";
    }

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally (optional)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.status === 401) {
        showError(401);
      }
    }
    return Promise.reject(error);
  }
);

const get = async (url, config = {}) => {
  try {
    const response = await instance.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getData = async (url, data, config = {}) => {
  try {
    const response = await instance.get(url, {
      ...config,
      params: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const post = async (url, data, config = {}) => {
  try {
    const response = await instance.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const put = async (url, data, config = {}) => {
  try {
    const response = await instance.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const patch = async (url, data, config = {}) => {
  try {
    const response = await instance.patch(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const del = async (url, config = {}) => {
  try {
    const response = await instance.delete(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { del as delete, get, getData, patch, post, put };
