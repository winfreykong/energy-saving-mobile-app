import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Svg, {
  G,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

interface GaugeChartProps {
  value: number; // The current value to display
  maxValue: number; // The maximum value of the gauge
  textDisplay: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const GaugeChart = ({ value, maxValue, textDisplay }: GaugeChartProps) => {
  const size = 200; // Size of the gauge
  const strokeWidth = 20;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const halfCircle = circumference / 2;

  const animatedValue = useRef(new Animated.Value(0)).current;

  const animate = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 1500,
      useNativeDriver: false, // Use false as we are animating the SVG
    }).start();
  };

  useEffect(() => {
    animate(value);
  }, [value]);

  const angle = animatedValue.interpolate({
    inputRange: [0, maxValue],
    outputRange: [0, 180],
  });

  const strokeDashoffset = angle.interpolate({
    inputRange: [0, 180],
    outputRange: [halfCircle, 0],
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size / 2} style={{ overflow: "visible" }}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="rgb(39, 163, 34)" />
            <Stop offset="50%" stopColor="rgb(157, 242, 53)" />
            <Stop offset="75%" stopColor="rgb(242, 223, 53)" />
            <Stop offset="100%" stopColor="rgb(242, 119, 53)" />
          </LinearGradient>
        </Defs>
        <G rotation="0" origin={`${center}, ${center}`}>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
            fill="none"
            startAngle="0"
            endAngle="180"
          />
          <AnimatedPath
            d={`M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${
              center + radius
            } ${center}`}
            stroke="url(#grad)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${halfCircle}, ${circumference}`}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{textDisplay}</Text>
        <Text style={styles.unitText}>compared to other times of use</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  valueContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: -30, // Adjust this value to add space between the gauge and values
  },
  valueText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3498db",
    paddingBottom: 20,
  },
  unitText: {
    fontSize: 12,
    color: "#7f8c8d",
  },
});

export default GaugeChart;
