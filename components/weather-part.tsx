import type { LucideIcon } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
import { slate } from "tailwindcss/colors";

import type { MainEnum } from "@/types/IGetFiveDayForecastResponse";

type Props = {
  label?: string | MainEnum;
  value?: string | number;
  metric: string;
  Icon?: LucideIcon;
  uri?: string;
};

const WeatherPart = ({ label, value, metric, ...props }: Props) => (
  <View className="items-center w-6/12 my-4 space-y-4">
    <View className="flex-row items-center justify-center pl-2 pr-3 space-x-2 rounded-full bg-slate-50/30">
      {props.Icon && !props.uri && (
        <View className="items-center justify-center w-12 h-12">
          <props.Icon size={24} color={slate["50"]} />
        </View>
      )}
      {props.uri && !props.Icon && (
        <Image
          source={{
            uri: props.uri,
          }}
          className="w-12 h-12"
        />
      )}
      <Text className="text-lg tracking-widest text-slate-50">{label}</Text>
    </View>
    <View className="flex-row items-center justify-center">
      <Text className="text-3xl font-bold text-slate-50">{value}</Text>
      <Text className="text-3xl text-slate-50/50">{metric}</Text>
    </View>
  </View>
);

export default WeatherPart;
