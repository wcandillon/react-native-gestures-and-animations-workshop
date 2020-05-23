import React from "react";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { interpolateColor } from "react-native-redash";
import Cursor from "./Cursor";
import { StyleGuide } from "../components";
import CircularProgress from "./CircularProgress";

const { Value, sub, add, cond, lessThan } = Animated;
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
  },
  content: {
    width: r * 2,
    height: r * 2,
  },
});

const CircularSlider = () => {
  const start = new Value(0);
  const end = new Value(0);
  const theta = sub(
    cond(lessThan(start, end), end, add(end, Math.PI * 2)),
    start
  );
  const backgroundColor = interpolateColor(theta, {
    inputRange: [0, PI, 2 * PI],
    outputRange: ["#ff3884", StyleGuide.palette.primary, "#38ffb3"],
  });
  const rotate = sub(PI, end);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, transform: [{ rotate }] }}
        >
          <CircularProgress
            strokeWidth={STROKE_WIDTH}
            color={backgroundColor}
            {...{ r, theta }}
          />
        </Animated.View>
        <Cursor
          theta={start}
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
          {...{ backgroundColor }}
        />
        <Cursor
          theta={end}
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
          {...{ backgroundColor }}
        />
      </View>
    </View>
  );
};

export default CircularSlider;
