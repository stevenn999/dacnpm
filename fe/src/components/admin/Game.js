import React, { Component } from "react";
import PlayGame from "./PlayGame";
import PreparePlayGame from "./PreparePlayGame";
import openSocket from "socket.io-client";
import axios from "axios";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:8000",
      startPlay: false,
      questions: [],
      numberMember: 0,
      numberMemberAnswer: 0,
      members: [],
      numberQuestion: 1
    };
    this.socket = null;
  }
  componentDidMount() {
    const { startPlay } = this.setState;
    this.start();
    this.socket.emit("start", startPlay);
    this.getData();
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

    this.socket.on("Number", data => {
      this.setState({
        numberMember: data
      });
    });

    this.socket.on("newMember", data => {
      const { members } = this.state;
      this.setState({
        members: [...members, data]
      });
    });

    this.socket.on("memberAnswer", data => {
      if (data.isRight) {
        var { members } = this.state;
        const index = members.findIndex(m => m.id === data.id);

        members[index] = {
          id: members[index].id,
          nickName: members[index].nickName,
          rightQuestion: members[index].rightQuestion + 1,
          score: members[index].score + 100
        };
        members.sort(function(a, b) {
          if (a.score > b.score) {
            return -1;
          }
          if (b.score > a.score) {
            return 1;
          }
          return 0;
        });
        this.setState({
          members
        });
      }
    });

    this.socket.on("numberQuestion", data => {
      this.setState({
        numberQuestion: data
      });
    });

    this.socket.on("numberMemberAnswer", data => {
      this.setState({
        numberMemberAnswer: data
      });
    });
    this.socket.on("memberExit", data => {
      var { members } = this.state;
      const index = members.findIndex(m => m.id === data.id);

      members.splice(index, 1);
      this.setState({
        members
      });
    });
  };

  getData = () => {
    axios
      .get(`http://localhost:8000/getdata`)
      .then(res => {
        const questions = res.data;
        this.setState({
          questions
        });
      })
      .catch(err => {
        console.log(err);
        return 0;
      });
  };

  clickStart = () => {
    this.socket.emit("start", true);
    this.setState({
      startPlay: true
    });
  };

  clickNext = () => {
    this.socket.emit("next", 1);
  };

  render() {
    const {
      startPlay,
      questions,
      numberMember,
      members,
      numberQuestion,
      numberMemberAnswer
    } = this.state;

    if (startPlay) {
      return (
        <PlayGame
          numberQuestion={numberQuestion}
          numberMember={numberMember}
          clickNext={this.clickNext}
          question={questions[numberQuestion].question}
          answer={questions[numberQuestion].answer}
          numberMemberAnswer={numberMemberAnswer}
          numberQuestions={questions.length}
          members={members}
        />
      );
    } else {
      return (
        <PreparePlayGame
          clickStart={this.clickStart}
          numberMember={numberMember}
          members={members}
        />
      );
    }
  }
}

export default Game;
