import { useQuery } from "@tanstack/react-query";
import type { Stack } from "expo-router";
import { useEffect, useMemo, useState, type ComponentProps } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { slate } from "tailwindcss/colors";

import useDebounceCallback from "@/hooks/useDebounceCallback";
import { getCityQueryOptions } from "@/queryOptions/getCityQueryOptions";
import { getFiveDayForecastQueryOptions } from "@/queryOptions/getFiveDayForecastQueryOptions";
import type {
  IGetCityResponse,
  IGetCityResponseWithoutLocalNames,
} from "@/types/IGetCityResponse";

interface HourlyForecastItem {
  hour: string;
  temp: number;
  uri: string;
}

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

  const hourlyForecast = useMemo(
    () =>
      fiveDayForecastData?.list.reduce((acc, item) => {
        const now = new Date();
        const itemDate = new Date(item.dt * 1000);
        if (now <= itemDate && acc.length < 5) {
          acc.push({
            hour: item.dt_txt.split(" ")[1].slice(0, 5),
            temp: Math.floor(item.main.temp),
            uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
          });
        }
        return acc;
      }, [] as HourlyForecastItem[]),
    [fiveDayForecastData?.list],
  );

  const hourlyForecastLabels = useMemo(
    () => hourlyForecast?.map((item) => item.hour) ?? [],
    [hourlyForecast],
  );
  const hourlyTemperatures = useMemo(
    () => hourlyForecast?.map((item) => item.temp) ?? [],
    [hourlyForecast],
  );

  const opacityOne = useSharedValue(0);
  const opacityTwo = useSharedValue(0);
  const opacityThree = useSharedValue(0);
  const opacityFour = useSharedValue(0);

  useEffect(() => {
    const delay = 500;
    opacityOne.value = withTiming(1, { duration: 1000 });
    setTimeout(() => {
      opacityTwo.value = withTiming(1, { duration: 1000 });
    }, delay);
    setTimeout(() => {
      opacityThree.value = withTiming(1, { duration: 1000 });
    }, delay * 2);
    setTimeout(() => {
      opacityFour.value = withTiming(1, { duration: 1000 });
    }, delay * 3);
  }, []);

  const animatedStyleOne = useAnimatedStyle(() => {
    return {
      opacity: opacityOne.value,
    };
  });

  const animatedStyleTwo = useAnimatedStyle(() => {
    return {
      opacity: opacityTwo.value,
    };
  });

  const animatedStyleThree = useAnimatedStyle(() => {
    return {
      opacity: opacityThree.value,
    };
  });

  const animatedStyleFour = useAnimatedStyle(() => {
    return {
      opacity: opacityFour.value,
    };
  });

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
    computed: {
      hourlyForecast,
      hourlyForecastLabels,
      hourlyTemperatures,
      animatedStyleOne,
      animatedStyleTwo,
      animatedStyleThree,
      animatedStyleFour,
    },
  };
};

export default useHomeContainer;
