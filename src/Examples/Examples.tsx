import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Routes, StyleGuide, Thumbnail } from "../components";

const examples = [
  {
    screen: "Transitions",
    title: "Transitions",
    source: require("../../assets/examples/transitions.png"),
  },
  {
    screen: "Animations",
    title: "Animations",
    source: require("../../assets/examples/animations.png"),
  },
  {
    screen: "Gestures",
    title: "Gestures",
    source: require("../../assets/examples/gestures.png"),
  },
  {
    screen: "SVGAnimations",
    title: "SVG Animations",
    source: require("../../assets/examples/svg-animations.png"),
  },
] as const;

export const assets = examples.map(({ source }) => source);

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background,
  },
  content: {
    paddingBottom: 32,
  },
});

const Examples = () => {
  const { navigate } = useNavigation<StackNavigationProp<Routes, "Examples">>();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map((thumbnail) => (
        <Thumbnail
          key={thumbnail.screen}
          onPress={() => navigate(thumbnail.screen)}
          {...thumbnail}
        />
      ))}
    </ScrollView>
  );
};

export default Examples;
