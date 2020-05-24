import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSafeArea } from "react-native-safe-area-context";

import { Routes, StyleGuide, Thumbnail } from "../components";

const examples = [
  {
    screen: "HeartOfTheMatter",
    title: "The Heart of the Matter",
    source: require("../../assets/examples/heart-of-the-matter.png"),
  },
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
    paddingVertical: StyleGuide.spacing,
  },
});

const Examples = () => {
  const insets = useSafeArea();
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
      <View style={{ height: insets.bottom }} />
    </ScrollView>
  );
};

export default Examples;
