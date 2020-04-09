import React, { Component } from "react";
import * as actions from "../../actions/actionPlayer";
import { connect } from "react-redux";

export class Answer extends Component {

  onClick = index => {
    const { socket, questions, numberCurrentQuestion } = this.props.player;
    const { clickAnswer } = this.props;
    const rightAnswer = questions[numberCurrentQuestion].rightAnswer;
    clickAnswer(true);
    if (index === rightAnswer) {
      socket.emit("memberAnswer", true);
      alert("Bạn trả lời đúng rồi");
    } else {
      socket.emit("memberAnswer", false);
      alert("Bạn trả lời sai rồi");
    }
  };
  
  render() {
    const { questions, numberCurrentQuestion, disableAnswer } = this.props.player;
    const question = questions[numberCurrentQuestion];
   

    return (
      <div className="answers ">
        <button
          onClick={() => this.onClick(1)}
          type="button"
          disabled={disableAnswer}
          className="btn btn-success  col-10 col-sm-5 answer"
        >
          {question.answer1}
        </button>
        <button
          onClick={() => this.onClick(2)}
          type="button"
          disabled={disableAnswer}
          className="btn btn-success col-10 col-sm-5 answer"
        >
          {question.answer2}
        </button>
        <button
          onClick={() => this.onClick(3)}
          type="button"
          disabled={disableAnswer}
          className="btn btn-success col-10 col-sm-5 answer"
        >
          {question.answer3}
        </button>
        <button
          onClick={() => this.onClick(4)}
          type="button"
          disabled={disableAnswer}
          className="btn btn btn-success col-10 col-sm-5 answer"
        >
          {question.answer4}
        </button>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    player: state.player
  };
};

const mapDispathToProps = (dispatch, props) => {
  return {
    clickAnswer: disableAnswer => {
      dispatch(actions.clickAnswer(disableAnswer));
    }
  };
};
export default connect(mapStatetoProps, mapDispathToProps)(Answer);
