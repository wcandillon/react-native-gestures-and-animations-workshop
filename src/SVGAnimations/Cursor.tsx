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

const Cursor = ({ r, theta, strokeWidth, backgroundColor }: CursorProps) => {
  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor,
        width: strokeWidth,
        height: strokeWidth,
        borderRadius: strokeWidth / 2,
        borderColor: "white",
        borderWidth: 5,
      }}
    />
  );
};

export default Cursor;
