import React, { Component } from "react";
import axios from "axios";
import Answer from "./Answer";
import Question from "./Quetions";
import Img from "./Img";
import EnterPin from "./EnterPin";
import openSocket from "socket.io-client";

export class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:8000",
      questions: "",
      numberQuestion: 0,
      score: 0,
      start: 0,
      nickName: "",
      pin: ""
    };
    this.socket = null;
  }

  componentDidMount() {
    this.start();
  }

  start = () => {
    var options = {
      rememberUpgrade: true,
      transports: ["websocket"],
      secure: true,
      rejectUnauthorized: false
    };

    const { endpoint } = this.state;
    this.socket = openSocket(endpoint, options);

    this.socket.on("startOk", data => {
      if (parseInt(data)) {
        this.getData();
      }
    });
  };

  getData = () => {
    axios
      .get(`http://localhost:8000/getdata`)
      .then(res => {
        const questions = res.data;
        this.setState({
          questions,
          start: 1
        });
      })
      .catch(err => {
        console.log(err);
        return 0;
      });
  };

  clickAnswer = numberAnswer => {
    const { questions } = this.state;
    var { numberQuestion } = this.state;
    const rightAnswer = questions[numberQuestion].rightAnswer;

    numberAnswer === rightAnswer
      ? alert("Bạn trả lời đúng rồi")
      : alert("Bạn trả lời sai rồi");
    numberQuestion += 1;
    if (questions.length > numberQuestion) {
      this.setState({
        numberQuestion
      });
    }
  };
  clickSubmit = (nickName, pin) => {
    this.setState({
      nickName,
      pin
    });
    if (nickName) {
      this.socket.emit("nickName", nickName);
    }
  };

  render() {
    const { questions, numberQuestion, start, pin, nickName } = this.state;

    if (pin === 6969 && nickName && start != 1) {
      return (
        <div className=" wrapper col-sm-8 col-lg-6 ">
          <h1>Waiting</h1>
        </div>
      );
    } else if (questions && start && pin === 6969) {
      return (
        <div className=" wrapper col-sm-8 col-lg-6 ">
          <Question question={questions[numberQuestion].question} />
          <Img />
          <Answer
            answer={questions[numberQuestion].answer}
            clickAnswer={this.clickAnswer}
          />
        </div>
      );
    } else {
      return (
        <div className=" wrapper col-sm-8 col-lg-6 ">
          <EnterPin clickSubmit={this.clickSubmit} />
        </div>
      );
    }
  }
}

export default Box;
