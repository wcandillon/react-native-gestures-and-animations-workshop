import React from "react";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { interpolateColor, useValue } from "react-native-redash";
import Cursor from "./CursorFinal";
import { StyleGuide } from "../components";
import CircularProgress from "./CircularProgressFinal";

const { PI } = Math;
const { width } = Dimensions.get("window");
const size = width - 32;
const STROKE_WIDTH = 40;
const r = PixelRatio.roundToNearestPixel(size / 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-90deg" }],
  },
  content: {
    width: r * 2,
    height: r * 2,
  },
});

const CircularSlider = () => {
  const theta = useValue(0);
  const backgroundColor = interpolateColor(theta, {
    inputRange: [0, PI, 2 * PI],
    outputRange: ["#ff3884", StyleGuide.palette.primary, "#38ffb3"],
  });
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <CircularProgress
            strokeWidth={STROKE_WIDTH}
            color={backgroundColor}
            {...{ r, theta }}
          />
        </Animated.View>
        <Cursor
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
          {...{ backgroundColor, theta }}
        />
      </View>
    </View>
  );
};

export default CircularSlider;
