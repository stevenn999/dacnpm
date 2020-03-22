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
      start: false,
      nickName: "",
      pin: "",
      disableAnswer: false
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
    this.socket.on("numberQuestion", data => {
      this.setState({ numberQuestion: data, disableAnswer: false });
    });
    this.socket.on("startOk", start => {
      if (start) {
        this.getData();
      } else {
        this.setState({
          start: false,
          nickName: "",
          pin: ""
        });
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
          start: true
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
    this.setState({
      disableAnswer: true
    });
    if (numberAnswer === rightAnswer) {
      this.socket.emit("memberAnswer", true);
    } else {
      this.socket.emit("memberAnswer", false);
    }
    if (questions.length > numberQuestion) {
      this.setState({
        numberQuestion
      });
    }
  };

  clickSubmit = (nickName, pin) => {
    this.socket.emit("creatRoom", 6969);
    this.setState({
      nickName,
      pin
    });
    if (nickName && pin === 6969) {
      this.socket.emit("nickName", nickName);
    }
  };

  show = () => {
    const {
      questions,
      numberQuestion,
      start,
      pin,
      nickName,
      disableAnswer
    } = this.state;
    if (pin === 6969 && nickName && !start) {
      return <h1>Waiting</h1>;
    } else if (questions && start && pin === 6969) {
      return (
        <div>
          <Question question={questions[numberQuestion].question} />
          <Img />
          <Answer
            answer={questions[numberQuestion].answer}
            clickAnswer={this.clickAnswer}
            disable={disableAnswer}
          />
        </div>
      );
    } else {
      return <EnterPin clickSubmit={this.clickSubmit} />;
    }
  };

  render() {
    return (
      <div className="row">
        <div className=" wrapper col-sm-8 col-lg-8 ">{this.show()}</div>
      </div>
    );
  }
}

export default Box;
