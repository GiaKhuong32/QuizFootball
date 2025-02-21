import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Rules: React.FC = () => {
  return (
    <View style={{ marginTop: 50 }}>
      <Image
        style={{ width: "100%", height: 200, resizeMode: "cover" }}
        source={require("../assets/images/footballQuiz.png")}

      />
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>QUIZ RULES</Text>
        <View style={styles.ruleContainer}>
          {[
            "For each mode you have 10 questions (random and not repeat)",
            "For each correct answer you get 1 point (Max: 10 points)",
            "Easy: 10s for 1 question",
            "Hard: 60s for 1 question",
            "Easy: Choose correct answer with full football player picture showed",
            "Hard: Type correct football player name with full football player picture showed",
            "Button with icon 'i' gives you a hint for your question",
            "Button with icon 'bulb' gives you the answer for your question (only in hard mode)",
          ].map((rule, index) => (
            <View key={index} style={styles.ruleItem}>
              <Text style={styles.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Rules;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "600",
  },
  ruleContainer: {
    padding: 10,
    backgroundColor: "#7cc",
    borderRadius: 6,
    marginTop: 15,
  },
  ruleItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ruleText: {
    marginLeft: 4,
    color: "black",
    fontSize: 15,
    fontWeight: "500",
  },
});
