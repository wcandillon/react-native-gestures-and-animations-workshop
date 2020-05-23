import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

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

  return (
    <View
      style={styles.container}
      onLayout={({
        nativeEvent: {
          layout: { height: h },
        },
      }) => setContainerHeight(h)}
    >
      {cards.map((card, index) => {
        return (
          <View style={[styles.card]} key={index}>
            <Card {...{ card }} />
          </View>
        );
      })}
    </View>
  );
};

export default Wallet;
