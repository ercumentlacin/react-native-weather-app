import axiosInstance from "@/lib/axios";
import type { IGetFiveDayForecastResponse } from "@/types/IGetFiveDayForecastResponse";

export const getFiveDayForecast = async (
  lat: number,
  lon: number,
): Promise<IGetFiveDayForecastResponse> => {
  try {
    const { data } = await axiosInstance.get<IGetFiveDayForecastResponse>(
      "/data/2.5/forecast",
      {
        params: {
          lat,
          lon,
          units: "metric",
        },
      },
    );

    return data;
  } catch (error) {
    console.error("🚀 ~ getFiveDayForecast ~ error", error);
    return {} as IGetFiveDayForecastResponse;
  }
};
