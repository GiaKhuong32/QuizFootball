import React, { useRef, useEffect } from "react";
import { View, Image, Text, Animated } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Menu: undefined;
  Easy: undefined;
  Hard: { type?: number };
  Rules: undefined;
};

type MenuProps = NativeStackScreenProps<RootStackParamList, "Menu">;

const Menu: React.FC<MenuProps> = ({ navigation }) => {
  const translateX = useRef(new Animated.Value(300)).current; // Bắt đầu từ phải

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -200, // Chạy từ phải -> trái
        duration: 5000, // Chạy chậm hơn
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const btnEasy_Clicked = () => {
    navigation.navigate("Easy");
  };

  const btnHard_Clicked = (type?: number) => {
    navigation.navigate("Hard", { type: undefined });
  };

  const btnRules_Clicked = () => {
    navigation.navigate("Rules");
  };

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 22,
          color: "black",
        }}
      >
        WHO IS THIS FOOTBALL PLAYER?
      </Text>
      <View style={{ flex: 4 }}>
        <Image
          style={{
            flex: 1,
            resizeMode: "cover",
            width: "100%",
            height: "100%",
          }}
          source={require("../assets/images/footballQuiz.png")}
        />
      </View>
      <View style={{ flex: 4, marginTop: 50, alignItems: "center" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: 30,
              color: "#37C321",
            }}
            onPress={btnEasy_Clicked}
          >
            EASY
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: 30,
              color: "#C82424",
            }}
            onPress={() => btnHard_Clicked()}
          >
            HARD
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 30,
              color: "black",
            }}
            onPress={btnRules_Clicked}
          >
            RULES
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ height: 1, backgroundColor: "black" }} />
        <Animated.Text
          style={{
            margin: 20,
            textAlign: "center",
            fontWeight: "bold",
            transform: [{ translateX }],
          }}
        >
          PLEASE READ THE RULES BEFORE START
        </Animated.Text>
      </View>
    </View>
  );
};

export default Menu;
