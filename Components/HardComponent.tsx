import React, { Component } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import { players, Player } from "../shared/players";
import { IMAGES } from "../shared/images";

interface HardState {
  txtInput: string;
  imgHinh: any;
  score: number;
  showModal: boolean;
  timeCounter: number;
  hint: string;
}

class Hard extends Component<{}, HardState> {
  private curNum: number;

  private questions: Player[];
  private curQuestion!: Player;
  private intervalId: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.curNum = 0;
    this.questions = players;

    this.state = {
      txtInput: "",
      imgHinh: null,
      score: 0,
      showModal: false,
      timeCounter: 60,
      hint: "",
    };
  }

  componentDidMount(): void {
    this.callNextQuestionIfNeeded();
    this.startTimer();
  }

  nextQuestion = (): void => {
    const random = Math.floor(Math.random() * this.questions.length);
    this.curQuestion = this.questions[random];
    this.setState({
      imgHinh: IMAGES.find(img => img.id === this.curQuestion.ID)?.src || null,
      hint: this.curQuestion.hint || "No hint available.",
    });
  };

  callNextQuestionIfNeeded = (): void => {
    if (this.curNum >= 10) {
      return;
    }
  
    this.curNum += 1; 
    if (this.curNum === 10) {
      this.setState((prevState) => ({
        ...prevState,
        showResult: true, 
      }), () => {
        Alert.alert(
          "Kết Quả",
          `Bạn đã hoàn thành 10 câu hỏi!\nĐiểm số: ${this.state.score}/10`,
          [{ text: "OK", onPress: () => console.log("Game kết thúc") }]
        );
      });
  
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    } else {
      this.nextQuestion();
      this.setState({ timeCounter: 60 });
    }
  };
  

  startTimer = (): void => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timeCounter === 0) {
          this.callNextQuestionIfNeeded();
          return { timeCounter: 60 };
        }
        return { timeCounter: prevState.timeCounter - 1 };
      });
    }, 1000);
  };

  handleAnswerSubmit = (text: string): void => {
    if (this.curNum > 10) {
      return;
    }
  
    let isCorrect = text.trim().toLowerCase() === this.curQuestion.correctOption.toLowerCase();
  
    this.setState((prevState) => ({
      score: isCorrect ? Math.min(prevState.score + 1, 10) : prevState.score, 
      txtInput: "", 
    }), () => {
      this.callNextQuestionIfNeeded();
    });
  };
  
  

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={{ flex: 1, margin: 20 }}>
            <Text style={styles.headerText}>{this.curNum}. WHO IS THIS FOOTBALL PLAYER?</Text>
            <Image style={styles.image} source={this.state.imgHinh} />

            <View style={{ flex: 2 }}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Type here ..."
                value={this.state.txtInput}
                onChangeText={(txtInput) => this.setState({ txtInput })}
                onSubmitEditing={(event) => this.handleAnswerSubmit(event.nativeEvent.text)}
              />
            </View>

            <View style={styles.footerContainer}>
              <Text style={styles.scoreText}>Score: {this.state.score}/10</Text>
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{this.state.timeCounter}s</Text>
              </View>
              <Icon raised name="info-outline" color="#f50" onPress={() => Alert.alert("Thông tin:", "Bạn cần trả lời câu hỏi này trong thời gian quy định")} />
              <Icon raised name="help-outline" color="#f50" onPress={() => Alert.alert("Gợi ý:", this.curQuestion.correctOption)} />


            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "black",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  timerContainer: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 20,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default Hard;
