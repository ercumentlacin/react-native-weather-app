import { LinearGradient } from "expo-linear-gradient";
import { Stack, type ErrorBoundaryProps } from "expo-router";
import { Droplet, Gauge, SunDim } from "lucide-react-native";
import { FlatList, Image, Text, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { slate } from "tailwindcss/colors";

import WeatherChart from "@/components/weather-chart";
import WeatherPart from "@/components/weather-part";
import useHomeContainer from "@/hooks/containers/useHomeContainer";

export default function HomeScreen() {
  const {
    state: { city, isKeyboardVisible, cityData, todayForecast },
    actions: { onCitySelect, setIsKeyboardVisible, debouncedSetCity },
    values: { timeIn24HourFormat, screenOptions, weatherIconUrl },
    computed: {
      hourlyForecast,
      hourlyForecastLabels,
      hourlyTemperatures,
      animatedStyleOne,
      animatedStyleTwo,
      animatedStyleThree,
      animatedStyleFour,
    },
  } = useHomeContainer();

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
              inputMode="search"
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
                      onPress={() => onCitySelect(item)}
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
              uri: weatherIconUrl,
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

        <View
          className="flex-row flex-wrap justify-between py-4 mx-4"
          style={{
            flex: 4,
          }}
        >
          <Animated.View
            style={animatedStyleOne}
            className="items-center justify-center grow shrink-0"
          >
            <WeatherPart
              label={todayForecast?.weather[0].main}
              value={todayForecast?.wind.speed}
              metric="km/h"
              uri={weatherIconUrl}
            />
          </Animated.View>

          <Animated.View
            style={animatedStyleTwo}
            className="items-center justify-center grow shrink-0"
          >
            <WeatherPart
              label="Humidity"
              value={todayForecast?.main.humidity}
              metric="%"
              Icon={Droplet}
            />
          </Animated.View>

          <Animated.View
            style={animatedStyleThree}
            className="items-center justify-center grow shrink-0"
          >
            <WeatherPart
              label="Feels"
              value={todayForecast?.main.feels_like}
              metric="°"
              Icon={SunDim}
            />
          </Animated.View>

          <Animated.View
            style={animatedStyleFour}
            className="items-center justify-center grow shrink-0"
          >
            <WeatherPart
              label="Pressure"
              value={todayForecast?.main.pressure}
              metric="hpa"
              Icon={Gauge}
            />
          </Animated.View>
        </View>

        {hourlyForecast && hourlyForecast.length > 0 && (
          <View className="mx-4 mb-5 border-t border-slate-50/50">
            <WeatherChart
              labels={hourlyForecastLabels}
              data={hourlyTemperatures}
              hourlyForecast={hourlyForecast}
            />
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text>{props.error.message}</Text>
      <Text onPress={props.retry}>Try Again?</Text>
    </SafeAreaView>
  );
}
