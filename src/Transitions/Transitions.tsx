import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Button, Card, StyleGuide, cards } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});
const alpha = Math.PI / 6;

const UseTransition = () => {
  const [toggled, setToggle] = useState(false);
  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => {
        const rotate = toggled ? (index - 1) * alpha : 0;
        return (
          <Animated.View
            key={card}
            style={[
              styles.overlay,
              {
                transform: [{ rotate: `${rotate}rad` }],
              },
            ]}
          >
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggle((prev) => !prev)}
      />
    </View>
  );
};

export default UseTransition;
