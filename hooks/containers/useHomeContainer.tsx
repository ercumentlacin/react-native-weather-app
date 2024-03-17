import { useQuery } from "@tanstack/react-query";
import type { Stack } from "expo-router";
import { useState, type ComponentProps } from "react";
import { slate } from "tailwindcss/colors";

import useDebounceCallback from "@/hooks/useDebounceCallback";
import { getCityQueryOptions } from "@/queryOptions/getCityQueryOptions";
import { getFiveDayForecastQueryOptions } from "@/queryOptions/getFiveDayForecastQueryOptions";
import type {
  IGetCityResponse,
  IGetCityResponseWithoutLocalNames,
} from "@/types/IGetCityResponse";

const screenOptions = {
  headerStyle: { backgroundColor: slate["500"] },
} satisfies ComponentProps<typeof Stack.Screen>["options"];

const mapCityData = (
  data: IGetCityResponse[],
): IGetCityResponseWithoutLocalNames[] => {
  const map = new Map<string, IGetCityResponseWithoutLocalNames>();

  for (const city of data) {
    const cityIdentifier = `${city.name}, ${city.country}`;

    map.set(cityIdentifier, {
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    });
  }
  return Array.from(map.values());
};
const timeIn24HourFormat = new Date().toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const useHomeContainer = () => {
  const [city, setCity] = useState("Istanbul");
  const [lat, setLat] = useState(41.009198);
  const [lon, setLon] = useState(28.966219);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const debouncedSetCity = useDebounceCallback(setCity, 500);

  const { data: cityData } = useQuery({
    ...getCityQueryOptions(city),
    select: mapCityData,
  });
  const { data: fiveDayForecastData } = useQuery({
    ...getFiveDayForecastQueryOptions(lat, lon),
    enabled: lat !== 0 && lon !== 0,
  });

  const onCitySelect = (item: IGetCityResponseWithoutLocalNames) => {
    setLat(item.lat);
    setLon(item.lon);
    setCity(item.name);
    setIsKeyboardVisible(false);
  };

  const todayForecast = fiveDayForecastData?.list[0];

  const weatherIconUrl = `http://openweathermap.org/img/wn/${todayForecast?.weather[0].icon}@2x.png`;

  return {
    state: {
      city,
      lat,
      lon,
      isKeyboardVisible,
      cityData,
      fiveDayForecastData,
      todayForecast,
    },
    actions: {
      setCity,
      setLat,
      setLon,
      setIsKeyboardVisible,
      debouncedSetCity,
      onCitySelect,
    },
    values: {
      timeIn24HourFormat,
      screenOptions,
      weatherIconUrl,
    },
  };
};

export default useHomeContainer;
