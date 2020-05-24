/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import { StyleGuide } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    backgroundColor: StyleGuide.palette.primary,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

const HeartOfTheMatter = () => {
  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => {
      position.setOffset({
        x: position.x._value,
        y: position.y._value,
      });
      position.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: position.x, dy: position.y },
    ]),
    onPanResponderRelease: () => {
      position.flattenOffset();
    },
  });
  useEffect(() =>
    new Array(5000).fill(0).map(() => console.log("JS thread busy!"))
  );
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.ball, position.getLayout()]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

export default HeartOfTheMatter;
