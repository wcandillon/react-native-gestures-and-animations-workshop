import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { mix, transformOrigin, useTransition } from "react-native-redash";
import { Button, CARD_WIDTH, Card, StyleGuide, cards } from "../components";

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
  const transition = useTransition(toggled, { duration: 400 });
  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => {
        const rotate = mix(transition, 0, (index - 1) * alpha);
        return (
          <Animated.View
            key={card}
            style={[
              styles.overlay,
              {
                transform: transformOrigin(
                  { x: -CARD_WIDTH / 2, y: 0 },
                  { rotate }
                ),
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
