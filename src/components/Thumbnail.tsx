import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { RectButton } from "react-native-gesture-handler";
import StyleGuide from "./StyleGuide";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: StyleGuide.spacing * 2,
    marginVertical: StyleGuide.spacing,
    borderRadius: 8,
    flex: 1,
    height: 150,
    overflow: "hidden",
    backgroundColor: StyleGuide.palette.backgroundPrimary,
  },
  image: {
    borderRadius: 8,
    width: undefined,
    height: 150,
    resizeMode: "contain",
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
}

const Thumbnail = ({ title, source, onPress }: ThumbnailProps) => {
  return (
    <RectButton {...{ onPress }}>
      <View style={styles.container}>
        <Animated.Image style={styles.image} {...{ source }} />
        <View style={styles.content}>
          <Text type="title3">{title}</Text>
        </View>
      </View>
    </RectButton>
  );
};

export default Thumbnail;
