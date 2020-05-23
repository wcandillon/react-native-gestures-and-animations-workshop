import * as React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { canvas2Polar, polar2Canvas, withOffset } from "react-native-redash";

const { Value, block, event, set, useCode } = Animated;

interface CursorProps {
  r: number;
  theta: Animated.Value<number>;
  strokeWidth: number;
  backgroundColor: Animated.Node<number>;
}

const Cursor = ({ r, theta, strokeWidth, backgroundColor }: CursorProps) => {
  const center = { x: r, y: r };
  const translationX = new Value(0);
  const translationY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const x = withOffset(translationX, state);
  const y = withOffset(translationY, state);
  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX,
        translationY,
        state,
      },
    },
  ]);
  useCode(() => block([set(theta, canvas2Polar({ x, y }, center).theta)]), [
    center,
    theta,
    x,
    y,
  ]);
  const { x: translateX, y: translateY } = polar2Canvas(
    { theta, radius: r },
    center
  );
  return (
    <PanGestureHandler
      onHandlerStateChange={onGestureEvent}
      {...{ onGestureEvent }}
    >
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
