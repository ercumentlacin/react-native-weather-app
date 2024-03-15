import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { slate } from "tailwindcss/colors";

export default function HomeScreen() {
  const city = "New York";
  return (
    <SafeAreaView className="flex-1 bg-slate-400">
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: slate["500"] },
        }}
      />
      <LinearGradient
        colors={[slate["400"], slate["500"]]}
        className="flex-1 px-2"
      >
        <View>
          <View className="w-6/12">
            <Text className="text-lg font-bold text-slate-50">21:30</Text>
            <Text className="inline-flex text-3xl font-bold text-slate-50 ">
              {city}
            </Text>
            <View className="h-[1px] bg-slate-50/50 my-2" />
          </View>
          <Text className="text-lg text-slate-50/70">Clear & Sunny Day</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
