import * as React from "react";
import { Dimensions, Image, ImageStyle, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import StyleGuide from "./StyleGuide";

type CardId = number;

export const assets: CardId[] = [
  require("../../assets/cards/card1.png"),
  require("../../assets/cards/card2.png"),
  require("../../assets/cards/card3.png"),
];

const { width } = Dimensions.get("window");
const CARD_ASPECT_RATIO = 1324 / 863;
export const CARD_WIDTH = width - StyleGuide.spacing * 8;
export const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 18,
  },
  flexibleContainer: {
    flex: 1,
    maxWidth: "100%",
    aspectRatio: CARD_ASPECT_RATIO,
    margin: StyleGuide.spacing,
    borderRadius: 18,
    resizeMode: "contain",
  },
});

export interface CardProps {
  card: CardId;
}

interface FlexibleCardProps extends CardProps {
  style?: Animated.AnimateStyle<ImageStyle>;
}

export const FlexibleCard = ({ card, style }: FlexibleCardProps) => (
  <Animated.Image style={[styles.flexibleContainer, style]} source={card} />
);

const Card = ({ card }: CardProps) => {
  return <Image style={styles.container} source={card} />;
};

export default Card;
