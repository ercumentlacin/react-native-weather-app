import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { Droplet, Gauge, SunDim } from "lucide-react-native";
import { useState, type ComponentProps } from "react";
import { FlatList, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

export default function HomeScreen() {
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

  const todayForecast = fiveDayForecastData?.list[0];

  return (
    <SafeAreaView className="flex-1 bg-slate-400">
      <Stack.Screen options={screenOptions} />
      <LinearGradient colors={[slate["400"], slate["500"]]} className="flex-1">
        <View className="px-4">
          <View className="relative w-6/12">
            <Text className="text-lg font-bold text-slate-50">
              {timeIn24HourFormat}
            </Text>
            <TextInput
              className="m-0 text-3xl font-bold text-slate-50 placeholder:text-slate-50 placeholder-slate-50"
              placeholder="New York"
              placeholderTextColor={slate["50"]}
              defaultValue={city}
              onChangeText={debouncedSetCity}
              keyboardType="web-search"
              onFocus={() => setIsKeyboardVisible(true)}
              onBlur={() => setIsKeyboardVisible(false)}
            />
            <View className="h-[1px] bg-slate-50/50 my-2" />
            {cityData && cityData?.length > 0 && isKeyboardVisible && (
              <View className="absolute left-0 flex-row flex-wrap justify-between w-[90vw] top-20 bg-slate-50/95 z-10 p-2 rounded-sm">
                <FlatList
                  data={cityData}
                  keyExtractor={(item) => `${item.name}, ${item.country}`}
                  renderItem={({ item }) => (
                    <Text
                      key={`${item.name}, ${item.country}`}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      onPress={() => {
                        setLat(item.lat);
                        setLon(item.lon);
                        setCity(item.name);
                        setIsKeyboardVisible(false);
                      }}
                    >
                      <Text className="text-lg text-slate-900">
                        {item.name}, {item.country}
                      </Text>
                      <Text className="invisible"> </Text>
                      <Text className="text-base text-slate-900/50">
                        {item.lat}, {item.lon}
                        tT
                      </Text>
                    </Text>
                  )}
                />
              </View>
            )}
          </View>
          <Text className="text-lg capitalize text-slate-50/70">
            {todayForecast?.weather[0].description}
          </Text>
        </View>

        <View className="flex-row items-center justify-center m-4 space-x-8 align-bottom">
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${todayForecast?.weather[0].icon}@2x.png`,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Text className="font-bold text-8xl text-slate-50">
            {Math.floor(
              todayForecast?.main.temp ?? todayForecast?.main.temp_kf ?? 0,
            )}
            °
          </Text>
        </View>

        <View className="mx-4 space-y-1">
          <Text className="font-bold text-slate-50">Details:</Text>
          <View className="h-[1px] bg-slate-50 opacity-25" />
        </View>

        <View className="flex-row flex-wrap justify-between py-4 mx-4 gap-y-4">
          <View className="items-center w-6/12 space-y-4">
            <View className="flex-row items-center justify-center pl-2 pr-3 space-x-2 rounded-full bg-slate-50/30">
              <Image
                source={{
                  uri: `http://openweathermap.org/img/wn/${todayForecast?.weather[0].icon}@2x.png`,
                }}
                className="w-12 h-12 rounded-full text-slate-50/50"
              />
              <Text className="text-lg tracking-widest text-slate-50">
                {todayForecast?.weather[0].main}
              </Text>
            </View>
            <View className="flex-row items-center justify-center space-x-2">
              <Text className="text-3xl font-bold text-slate-50">
                {todayForecast?.wind.speed}
              </Text>
              <Text className="text-3xl text-slate-50/50">km/h</Text>
            </View>
          </View>

          <View className="items-center w-6/12 space-y-4">
            <View className="flex-row items-center justify-center pl-2 pr-3 space-x-2 rounded-full bg-slate-50/30">
              <View className="items-center justify-center w-12 h-12">
                <Droplet size={24} color={slate["50"]} />
              </View>
              <Text className="text-lg tracking-widest text-slate-50">
                Humidity
              </Text>
            </View>
            <View className="flex-row items-center justify-center">
              <Text className="text-3xl font-bold text-slate-50">
                {todayForecast?.main.humidity}
              </Text>
              <Text className="text-3xl text-slate-50/50">%</Text>
            </View>
          </View>

          <View className="items-center w-6/12 space-y-4">
            <View className="flex-row items-center justify-center pl-2 pr-3 rounded-full bg-slate-50/30">
              <View className="items-center justify-center w-12 h-12">
                <SunDim size={24} color={slate["50"]} />
              </View>
              <Text className="text-lg tracking-widest text-slate-50">
                Feels
              </Text>
            </View>
            <View className="flex-row items-center justify-center">
              <Text className="text-3xl font-bold text-slate-50">
                {Math.floor(todayForecast?.main.feels_like ?? 0)}
              </Text>
              <Text className="text-3xl text-slate-50/50">°</Text>
            </View>
          </View>

          <View className="items-center w-6/12 space-y-4">
            <View className="flex-row items-center justify-center pl-2 pr-3 space-x-2 rounded-full bg-slate-50/30">
              <View className="items-center justify-center w-12 h-12">
                <Gauge size={24} color={slate["50"]} />
              </View>
              <Text className="text-lg tracking-widest text-slate-50">
                Pressure
              </Text>
            </View>
            <View className="flex-row items-center justify-center">
              <Text className="text-3xl font-bold text-slate-50">
                {todayForecast?.main.pressure}
              </Text>
              <Text className="text-3xl text-slate-50/50">hpa</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
