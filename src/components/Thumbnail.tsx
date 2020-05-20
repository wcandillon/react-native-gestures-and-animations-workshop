import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { mix } from "react-native-redash";
import StyleGuide from "./StyleGuide";
import Text from "./Text";
import TapHandler from "./TapHandler";

const { Value } = Animated;
const styles = StyleSheet.create({
  container: {
    margin: StyleGuide.spacing * 2,
    marginBottom: 0,
    borderRadius: 8,
    flex: 1,
    height: 150,
    overflow: "hidden",
    backgroundColor: StyleGuide.palette.backgroundPrimary,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    width: undefined,
    height: undefined,
    transform: [{ scale: 1 }],
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    padding: StyleGuide.spacing,
    justifyContent: "flex-end",
  },
});

interface ThumbnailProps {
  title: string;
  source: number;
  onPress: () => void;
  resizeMode?: "cover" | "contain";
}

const Thumbnail = ({ title, source, onPress, resizeMode }: ThumbnailProps) => {
  const value = new Value(0);
  const scale = mix(value, 1, 1.5);
  return (
    <TapHandler {...{ onPress, value }}>
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.image,
            {
              resizeMode: resizeMode || "contain",
              transform: [{ scale }],
            },
          ]}
          {...{ source }}
        />
        <View style={styles.content}>
          <Text type="title2">{title}</Text>
        </View>
      </View>
    </TapHandler>
  );
};

export default Thumbnail;
