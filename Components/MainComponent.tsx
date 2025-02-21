import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from "./MenuComponent";
import Easy from "./EasyComponent";
import Hard from "./HardComponent";
import Rules from "./RulesComponent";

type RootStackParamList = {
  Menu: undefined;
  Easy: undefined;
  Hard: undefined;
  Rules: undefined;
};

const MenuNavigator = createNativeStackNavigator<RootStackParamList>();

const MenuNavigatorScreen: React.FC = () => {
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: { backgroundColor: "green" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <MenuNavigator.Screen
        name="Rules"
        component={Rules}
        options={{ headerTitle: "HOW TO PLAY" }}
      />
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={{ headerTitle: "MODE" }}
      />
      <MenuNavigator.Screen
        name="Easy"
        component={Easy}
        options={{ headerTitle: "EASY" }}
      />
      <MenuNavigator.Screen
        name="Hard"
        component={Hard}
        options={{ headerTitle: "HARD" }}
      />
    </MenuNavigator.Navigator>
  );
};

const Main: React.FC = () => {
  return <MenuNavigatorScreen />;
};

export default Main;
