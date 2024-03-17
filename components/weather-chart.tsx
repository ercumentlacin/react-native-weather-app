import { memo } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { slate } from "tailwindcss/colors";

interface Props {
  labels: string[];
  data: number[];
  hourlyForecast: {
    hour: string;
    temp: number;
    uri: string;
  }[];
}

const WeatherChart = ({ labels, data, hourlyForecast }: Props) => {
  return (
    <LineChart
      data={{
        labels,
        datasets: [
          {
            data,
          },
        ],
      }}
      width={Dimensions.get("window").width}
      height={Dimensions.get("window").height / 4}
      yAxisInterval={1}
      withHorizontalLabels={false}
      withHorizontalLines={false}
      withVerticalLines={false}
      withInnerLines={false}
      withOuterLines={false}
      withShadow={false}
      chartConfig={{
        barPercentage: 0.5,
        backgroundColor: "#e269000",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
          r: "4",
          strokeWidth: "2",
          stroke: slate["50"],
          fill: slate["900"],
          opacity: 0.5,
        },
      }}
      renderDotContent={({ x, y, index }) => (
        <View key={index} className="relative">
          <View
            className="absolute items-center justify-center w-6 h-6"
            style={{
              top: y - 36,
              left: x - 12,
            }}
          >
            <Text className="text-sm text-slate-50">{data[index]}°</Text>
          </View>
          <Image
            source={{
              uri: hourlyForecast[index].uri,
            }}
            className="absolute w-6 h-6 opacity-95"
            style={{
              left: x + 25,
              top: y - 30,
              opacity: index === hourlyForecast.length - 1 ? 0 : 1,
            }}
          />
        </View>
      )}
      bezier
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    borderRadius: 16,
    paddingRight: 16,
  },
});

export default memo(WeatherChart);
