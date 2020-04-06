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
    const { socket } = this.props.player;

    socket.on("is_join_room", (is_join_room) => {
      const { isJoinRoom } = this.props;
      isJoinRoom(is_join_room);
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
  };

  show = () => {
    const { questions, start, pin, nickName, isJoinRoom } = this.props.player;

    if (questions !== null && start && pin && isJoinRoom) {
      return (
        <div className="row">
          <div className="col-12 col-sm-8 wrapper mx-auto">
            <Question />
            <Img />
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
