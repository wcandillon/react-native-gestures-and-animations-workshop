import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import Animated, {
  Extrapolate,
  add,
  interpolate,
} from "react-native-reanimated";

import { PanGestureHandler } from "react-native-gesture-handler";
import {
  diffClamp,
  usePanGestureHandler,
  withDecay,
} from "react-native-redash";
import { CARD_HEIGHT, Card, cards } from "../components";

const { height } = Dimensions.get("window");
const MARGIN = 16;
const HEIGHT = CARD_HEIGHT + MARGIN * 2;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  card: {
    marginVertical: MARGIN,
  },
});

const Wallet = () => {
  const [containerHeight, setContainerHeight] = useState(height);
  const visibleCards = Math.floor(containerHeight / HEIGHT);
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const y = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state,
    }),
    -HEIGHT * cards.length + visibleCards * HEIGHT,
    0
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: { height: h },
          },
        }) => setContainerHeight(h)}
      >
        {cards.map((card, index) => {
          const positionY = add(y, index * HEIGHT);
          const isDisappearing = -HEIGHT;
          const isTop = 0;
          const isBottom = HEIGHT * (visibleCards - 1);
          const isAppearing = HEIGHT * visibleCards;
          const translateYWithScale = interpolate(positionY, {
            inputRange: [isBottom, isAppearing],
            outputRange: [0, -HEIGHT / 4],
            extrapolate: Extrapolate.CLAMP,
          });
          const translateY = add(
            interpolate(y, {
              inputRange: [-HEIGHT * index, 0],
              outputRange: [-HEIGHT * index, 0],
              extrapolate: Extrapolate.CLAMP,
            }),
            translateYWithScale
          );
          const scale = interpolate(positionY, {
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [0.5, 1, 1, 0.5],
            extrapolate: Extrapolate.CLAMP,
          });
          const opacity = interpolate(positionY, {
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [0, 1, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              style={[
                styles.card,
                { opacity, transform: [{ translateY }, { scale }] },
              ]}
              key={index}
            >
              <Card {...{ card }} />
            </Animated.View>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Wallet;
