import axios from "axios";

import { environmentVariables } from "@/constants/environmentVariables";

const axiosInstance = axios.create({
  baseURL: environmentVariables.openWeather.baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    appid: environmentVariables.openWeather.apiKey,
  };
  return config;
});

export default axiosInstance;
