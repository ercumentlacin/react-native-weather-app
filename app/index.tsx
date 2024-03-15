import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { Sun, Wind } from "lucide-react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { slate } from "tailwindcss/colors";

const screenOptions = {
  headerStyle: { backgroundColor: slate["500"] },
};
export default function HomeScreen() {
  const city = "New York";
  return (
    <SafeAreaView className="flex-1 bg-slate-400">
      <Stack.Screen options={screenOptions} />
      <LinearGradient colors={[slate["400"], slate["500"]]} className="flex-1">
        <View className="px-4">
          <View className="w-6/12">
            <Text className="text-lg font-bold text-slate-50">21:30</Text>
            <Text className="inline-flex text-3xl font-bold text-slate-50 ">
              {city}
            </Text>
            <View className="h-[1px] bg-slate-50/50 my-4" />
          </View>
          <Text className="text-lg text-slate-50/70">Clear & Sunny Day</Text>
        </View>

        <View className="flex-row items-center justify-center gap-8 mx-4 my-4 align-bottom">
          <Sun size={56} color={slate["50"]} />
          <Text className="font-bold text-8xl text-slate-50">23°</Text>
        </View>

        <View className="gap-1 mx-4">
          <Text className="font-bold text-slate-50">Details:</Text>
          <View className="h-[1px] bg-slate-50 opacity-25" />
        </View>

        <View className="flex-row flex-wrap">
          <View className="gap-4">
            <View className="flex-row items-center gap-2 px-1 rounded-full bg-slate-50/50">
              <Wind size={24} color={slate["50"]} />
              <Text className="text-slate-50">Wind</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
