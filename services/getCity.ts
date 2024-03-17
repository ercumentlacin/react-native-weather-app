import axiosInstance from "@/lib/axios";
import type { IGetCityResponse } from "@/types/IGetCityResponse";

export const getCity = async (city: string): Promise<IGetCityResponse[]> => {
  try {
    const { data } = await axiosInstance.get<IGetCityResponse[]>(
      "/geo/1.0/direct",
      {
        params: {
          q: city,
          limit: 5,
        },
      },
    );

    return data;
  } catch {
    return [];
  }
};
