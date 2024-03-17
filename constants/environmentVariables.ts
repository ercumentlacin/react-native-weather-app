if (!process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY) {
  throw new Error("EXPO_PUBLIC_OPEN_WEATHER_API_KEY is not defined");
}

if (!process.env.EXPO_PUBLIC_OPEN_WEATHER_BASE_URL) {
  throw new Error("EXPO_PUBLIC_OPEN_WEATHER_BASE_URL is not defined");
}

export const environmentVariables = {
  openWeather: {
    apiKey: process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY,
    baseUrl: process.env.EXPO_PUBLIC_OPEN_WEATHER_BASE_URL,
  },
};
