import type { UseQueryOptions } from "@tanstack/react-query";

import { getFiveDayForecast } from "@/services/getFiveDayForecast";

export const getFiveDayForecastQueryOptions = (lat: number, lon: number) =>
  ({
    queryKey: ["forecast", { lat, lon }] as const,
    queryFn: () => getFiveDayForecast(lat, lon),
  }) satisfies UseQueryOptions;
