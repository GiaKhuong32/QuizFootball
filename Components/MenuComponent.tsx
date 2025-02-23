import React, { useState, useRef, useEffect } from "react";
import { View, Image, Text, Animated, TextInput, Keyboard, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Menu: undefined;
  Easy: undefined;
  Hard: { type?: number };
  Rules: undefined;
};

type MenuProps = NativeStackScreenProps<RootStackParamList, "Menu">;

const Menu: React.FC<MenuProps> = ({ navigation, route }) => { 
  const translateX = useRef(new Animated.Value(300)).current;
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -200,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleSearchSubmit = () => {
    const lowerCaseText = searchText.trim().toLowerCase();

    if (lowerCaseText === "easy") {
      Keyboard.dismiss();
      navigation.navigate("Easy");
    } else if (lowerCaseText === "hard") {
      Keyboard.dismiss();
      navigation.navigate("Hard", { type: undefined });
    } else if (lowerCaseText === "rules") {
      Keyboard.dismiss();
      navigation.navigate("Rules");
    }
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

      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
        placeholder="Nhập 'easy', 'hard' hoặc 'rules' để vào phần mình mong muốn"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearchSubmit}
        autoCapitalize="none"
      />

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
        <TouchableOpacity onPress={() => navigation.navigate("Easy")} style={{ marginBottom: 20 }}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: 30,
              color: "#37C321",
            }}
          >
            EASY
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Hard", { type: undefined })} style={{ marginBottom: 20 }}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: 30,
              color: "#C82424",
            }}
          >
            HARD
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Rules")}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 30,
              color: "black",
            }}
          >
            RULES
          </Text>
        </TouchableOpacity>
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
