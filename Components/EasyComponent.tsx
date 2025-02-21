import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";

import { players, Player } from "../shared/players";
import { IMAGES } from "../shared/images"; 

interface EasyState {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  imgHinh: any;
  score: number;
  showModal: boolean;
  timeCounter: number;
}

class Easy extends Component<{}, EasyState> {
  private curNum: number;
 
  private questions: Player[];
  private curQuestion!: Player;
  private intervalId: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.curNum = 0;
    this.questions = players;

    this.state = {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      imgHinh: null,
      score: 0,
      showModal: false,
      timeCounter: 30,
    };
  }

  startTimer = (): void => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timeCounter === 0) {
          this.callNextQuestionIfNeeded();
          return { timeCounter: 30 };
        }
        return { timeCounter: prevState.timeCounter - 1 };
      });
    }, 1000);
  };

  nextQuestion = (): void => {
    this.curNum += 1;
    if (this.curNum > 10) {
      this.setState({ showModal: true });
      clearInterval(this.intervalId!);
      return;
    }
    const random = Math.floor(Math.random() * this.questions.length);
    this.curQuestion = this.questions[random];
    this.setState({
      option1: this.curQuestion.option1,
      option2: this.curQuestion.option2,
      option3: this.curQuestion.option3,
      option4: this.curQuestion.option4,
      imgHinh: IMAGES.find(img => img.id === this.curQuestion.ID)?.src || null,
    });
  };

  handleOptionPress = (option: string): void => {
    if (this.curNum > 10) {
      return; 
    }
  
    if (option === this.curQuestion.correctOption) {
      this.setState((prevState) => ({
        score: Math.min(prevState.score + 1, 10), 
      }));
    }
    
    this.callNextQuestionIfNeeded();
  };
  
  

  callNextQuestionIfNeeded = (): void => {
    if (this.curNum < 10) {
      this.nextQuestion();
      this.setState({ timeCounter: 30 });
    } else {
     
      this.setState((prevState) => ({
        ...prevState,
        showResult: true
      }), () => {
        Alert.alert(
          "Kết quả",
          `Bạn đã hoàn thành 10 câu hỏi!\nĐiểm số: ${this.state.score}/10`,
          [{ text: "OK", onPress: () => console.log("Game kết thúc") }]
        );
      });
    }
  };      
  
  

  componentDidMount(): void {
    this.nextQuestion();
    this.startTimer();
  }

  render() {
    return (
      <View style={{ flex: 1, margin: 20 }}>
        <Text style={styles.headerText}>{this.curNum}. WHO IS THIS FOOTBALL PLAYER?</Text>
        <Image style={styles.image} source={this.state.imgHinh} />

        <View style={styles.optionsContainer}>
          {[this.state.option1, this.state.option2, this.state.option3, this.state.option4].map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionButton} onPress={() => this.handleOptionPress(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.scoreContainer}>
          <Text style={{ fontSize: 17 }}>Score: {this.state.score}/10</Text>
          <View style={styles.circularContainer}>
            <Text style={styles.circularText}>{this.state.timeCounter}s</Text>
          </View>
          <Icon raised name="info-outline" color="#f50" onPress={() => Alert.alert("Hint:", this.curQuestion?.hint || "No hint available.")} />
        </View>
      </View>
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
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: "#3498db",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  circularContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  circularText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Easy;
