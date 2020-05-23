import * as React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  add,
  cond,
  lessThan,
  proc,
  set,
  useCode,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  canvas2Polar,
  polar2Canvas,
  usePanGestureHandler,
  withOffset,
} from "react-native-redash";

interface CursorProps {
  r: number;
  theta: Animated.Value<number>;
  strokeWidth: number;
  backgroundColor: Animated.Node<number>;
}

const normalizeTheta = proc((theta: Animated.Node<number>) =>
  cond(lessThan(theta, 0), add(Math.PI * 2, theta), theta)
);

const Cursor = ({ r, theta, strokeWidth, backgroundColor }: CursorProps) => {
  const center = { x: r, y: r };
  const { gestureHandler, translation, state } = usePanGestureHandler();
  const x = withOffset(translation.x, state);
  const y = withOffset(translation.y, state);
  const polar = canvas2Polar({ x, y }, center);
  useCode(() => [set(theta, normalizeTheta(polar.theta))], [
    center,
    theta,
    x,
    y,
  ]);
  const { x: translateX, y: translateY } = polar2Canvas(
    { theta: polar.theta, radius: r },
    center
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor,
          width: strokeWidth,
          height: strokeWidth,
          borderRadius: strokeWidth / 2,
          transform: [{ translateX }, { translateY }],
          borderColor: "white",
          borderWidth: 5,
        }}
      />
    </PanGestureHandler>
  );
};

export default Cursor;
