import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import {
  Droplet,
  Gauge,
  MoveDown,
  Sun,
  SunDim,
  Wind,
} from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { slate } from "tailwindcss/colors";

const screenOptions = {
  headerStyle: { backgroundColor: slate["500"] },
};
export default function HomeScreen() {
  const [city, setCity] = useState("New York");
  return (
    <SafeAreaView className="flex-1 bg-slate-400">
      <Stack.Screen options={screenOptions} />
      <LinearGradient colors={[slate["400"], slate["500"]]} className="flex-1">
        <View className="px-4">
          <View className="w-6/12">
            <Text className="text-lg font-bold text-slate-50">21:30</Text>
            <TextInput
              className="m-0 text-3xl font-bold text-slate-50 placeholder:text-slate-50 placeholder-slate-50"
              placeholder="New York"
              placeholderTextColor={slate["50"]}
              value={city}
              onChangeText={setCity}
              keyboardType="web-search"
            />
            <View className="h-[1px] bg-slate-50/50 my-2" />
          </View>
          <Text className="text-lg text-slate-50/70">Clear & Sunny Day</Text>
        </View>

        <View className="flex-row items-center justify-center m-4 space-x-8 align-bottom">
          <Sun size={53} color={slate["50"]} />
          <Text className="font-bold text-8xl text-slate-50">23°</Text>
        </View>

        <View className="mx-4 space-y-1">
          <Text className="font-bold text-slate-50">Details:</Text>
          <View className="h-[1px] bg-slate-50 opacity-25" />
        </View>

        <View className="flex-row flex-wrap justify-between py-4 mx-4 gap-y-4">
          <View className="items-center w-6/12 space-y-4">
            <View className="flex-row items-center justify-center px-2 space-x-2 rounded-full bg-slate-50/30">
              <Wind size={16} color={slate["50"]} />
              <Text className="text-lg tracking-widest text-slate-50">
                Wind
              </Text>
            </View>
            <View className="flex-row items-center justify-center space-x-2">
              <Text className="text-3xl font-bold text-slate-50">12</Text>
              <Text className="text-3xl text-slate-50/50">km/h</Text>
            </View>
          </View>

          <View className="items-center w-6/12 space-y-4">
            <View className="flex-row items-center justify-center px-2 space-x-2 rounded-full bg-slate-50/30">
              <Droplet size={16} color={slate["50"]} />
              <Text className="text-lg tracking-widest text-slate-50">
                Humidity
              </Text>
            </View>
            <View className="flex-row items-center justify-center">
              <Text className="text-3xl font-bold text-slate-50">78</Text>
              <Text className="text-3xl text-slate-50/50">%</Text>
            </View>
          </View>

          <View className="items-center w-6/12 space-y-4">
            <View className="flex-row items-center justify-center px-2 space-x-2 rounded-full bg-slate-50/30">
              <SunDim size={16} color={slate["50"]} />
              <Text className="text-lg tracking-widest text-slate-50">
                UV Index
              </Text>
            </View>
            <View className="flex-row items-center justify-center space-x-1">
              <MoveDown size={20} color={slate["50"]} absoluteStrokeWidth />
              <View className="items-center justify-center rounded-full w-7 bg-slate-50 aspect-square">
                <Text className="text-xl font-bold text-cyan-600">2</Text>
              </View>
            </View>
          </View>

          <View className="items-center w-6/12 space-y-4">
            <View className="flex-row items-center justify-center px-2 space-x-2 rounded-full bg-slate-50/30">
              <Gauge size={16} color={slate["50"]} />
              <Text className="text-lg tracking-widest text-slate-50">
                Pressure
              </Text>
            </View>
            <View className="flex-row items-center justify-center">
              <Text className="text-3xl font-bold text-slate-50">1016</Text>
              <Text className="text-3xl text-slate-50/50">hpa</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
