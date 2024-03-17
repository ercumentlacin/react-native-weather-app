import type { UseQueryOptions } from "@tanstack/react-query";

import { getCity } from "@/services/getCity";

export const getCityQueryOptions = (city: string) =>
  ({
    queryKey: ["city", city] as const,
    queryFn: () => getCity(city),
  }) satisfies UseQueryOptions;
