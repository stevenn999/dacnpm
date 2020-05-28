import React, { Component } from "react";
import * as actions from "../../actions/actionPlayer";
import { connect } from "react-redux";
import Answer from "./Answer";
import Question from "./Questions";
import Img from "./Img";
import EnterPin from "./EnterPin";
import Waiting from "./Waiting";
import "./Player.css";

export class Player extends Component {
  componentDidMount = () => {
    //Kết nối Player với SocketIo
    const { connectSocketIoPlayer } = this.props;
    connectSocketIoPlayer();

    const { socket } = this.props.player;
    socket.on("leave_room", (data) => {
      socket.emit("exitRoom", true);
    });

    socket.on("is_join_room", (is_join_room) => {
      const { nickName, pin } = this.props.player;
      if (is_join_room) {
        var data = {
          nickName,
          idRoom:pin
        };
        socket.emit("nickName",data);
      } else alert("Phòng chưa được tạo");
    });

    socket.on("isRightNickName", (data) => {
      const { isJoinRoom } = this.props;
      if (data) {
        isJoinRoom(true);
      } else {
        alert(
          "NickName bị người khác hớt tay trên,vui lòng tạo nickName khác!!"
        );
        isJoinRoom(false);
      }
    });

    socket.on("newMember", (newMember) => {
      const { saveNewMember } = this.props;
      saveNewMember(newMember);
    });

    socket.on("startOk", (start) => {
      const { isPlay } = this.props;
      isPlay(start);
    });

    socket.on("questions", (questions) => {
      const { loadQuestions } = this.props;
      loadQuestions(questions);
    });

    socket.on("numberCurrentQuestion", (numberCurrentQuestion) => {
      const { loadQuestion } = this.props;
      loadQuestion(numberCurrentQuestion, false);
    });

    socket.on("hostExit", (is_join_room) => {
      const { isJoinRoom, isPlay } = this.props;
      isJoinRoom(false);
      isPlay(false);
    
    });
  };

  sendAnswer = () => {
    const { socket, questions, numberCurrentQuestion } = this.props.player;
    const { clickAnswer } = this.props;
    const rightAnswers = questions[numberCurrentQuestion].rightAnswers;
    let { playerAnswer } = this.props.player;
    for (let i = 0; i < rightAnswers.length; i++) {
      if (!rightAnswers[i]) rightAnswers[i] = false;
      if (!playerAnswer[i]) playerAnswer[i] = false;
    }

    clickAnswer(true);
    if (this.isEqual(rightAnswers, playerAnswer)) {
      let { score } = this.props.player;
      const { setScorePlayer } = this.props;
      score += parseInt(questions[numberCurrentQuestion].score);
      setScorePlayer(score);
      socket.emit("memberAnswer", true);
    } else {
      socket.emit("memberAnswer", false);
    }
  };
  isEqual = (a, b) => {
    if (a.length !== b.length) return false;
    else {
      for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
      return true;
    }
  };

  show = () => {
    const {
      questions,
      start,
      pin,
      nickName,
      isJoinRoom,
      disableAnswer,
    } = this.props.player;
    if (questions !== null && start && pin && isJoinRoom) {
      return (
        <div className="row">
          <div className="col-12 col-sm-8 wrapper mx-auto">
            <Question />
            <Img />
            <button
              onClick={this.sendAnswer}
              disabled={disableAnswer}
              className="btn bg-success text-light"
            >
              Gửi đáp án
            </button>
            <Answer />
          </div>
        </div>
      );
    } else if (pin && nickName && !start && isJoinRoom) {
      return <Waiting />;
    } else {
      return <EnterPin />;
    }
  };

  render() {
    return <div>{this.show()}</div>;
  }
}
const mapStatetoProps = (state) => {
  return {
    player: state.player,
  };
};

const mapDispathToProps = (dispatch, props) => {
  return {
    clickAnswer: (disableAnswer) => {
      dispatch(actions.clickAnswer(disableAnswer));
    },
    connectSocketIoPlayer: () => {
      dispatch(actions.connectSocketIoPlayer());
    },
    setTimeQuestion: (time) => {
      dispatch(actions.setTimeQuestion(time));
    },
    setScorePlayer: (score) => {
      dispatch(actions.setScorePlayer(score));
    },
    saveNewMember: (newMember) => {
      dispatch(actions.saveNewMember(newMember));
    },
    isJoinRoom: (isJoinRoom) => {
      dispatch(actions.isJoinRoom(isJoinRoom));
    },
    isPlay: (start) => {
      dispatch(actions.isPlay(start));
    },
    loadQuestions: (questions) => {
      dispatch(actions.loadQuestions(questions));
    },
    loadQuestion: (numberQuestion, disableAnswer) => {
      dispatch(actions.loadQuestion(numberQuestion, disableAnswer));
    },
  };
};
export default connect(mapStatetoProps, mapDispathToProps)(Player);
