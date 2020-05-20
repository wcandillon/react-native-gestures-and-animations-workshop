import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";

import StyleGuide, {Routes} from "./src/components";
import LoadAssets from "./src/components/LoadAssets";
import Examples from "./src/Examples";
import Transitions from "./src/Transitions";

enableScreens();

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const assets: number[] = [];

const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: StyleGuide.palette.primary,
          borderBottomWidth: 0,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Examples"
        component={Examples}
        options={{
          title: "Gestures & Animations",
        }}
      />
      <Stack.Screen
        name="Examples"
        component={Transitions}
        options={{
          title: "Transitions",
        }}
      />
    </Stack.Navigator>
);

const App = () => (
  <LoadAssets {...{ fonts, assets }}>
    <StatusBar barStyle="light-content" />
    <AppNavigator />
  </LoadAssets>
);

export default App;