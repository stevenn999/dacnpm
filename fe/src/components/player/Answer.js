import React, { Component } from "react";
import * as actions from "../../actions/actionPlayer";
import { connect } from "react-redux";

export class Answer extends Component {
  onClick = (index) => {
    const { socket, questions, numberCurrentQuestion } = this.props.player;
    const { clickAnswer } = this.props;
    const rightAnswer = questions[numberCurrentQuestion].rightAnswer;
    var {answersColor}=this.props.player;
    answersColor[index]='text-danger';

    clickAnswer(true,answersColor);
    if (index===rightAnswer-1) {
      socket.emit("memberAnswer", true);
    } else {
      socket.emit("memberAnswer", false);
    }
  };

  render() {
    const {
      questions,
      numberCurrentQuestion,
      disableAnswer,
      answersColor,
      answersBackgroundColor
    } = this.props.player;
    const question = questions[numberCurrentQuestion];
    const arr = [];
    arr.push(question.answer1);
    arr.push(question.answer2);
    arr.push(question.answer3);
    arr.push(question.answer4);

    const answers = arr.map(( answer,index) => {
      return (
        <button
          key={index}
          onClick={() => this.onClick(index)}
          type="button"
          disabled={disableAnswer}
          className={ `col-10 col-sm-5 btnAnswer ${answersColor[index]}  ${answersBackgroundColor[index]} `}
        >
          {answer}
        </button>
      );
    });
    return <div className="answers ">{answers}</div>;
  }
}

const mapStatetoProps = (state) => {
  return {
    player: state.player,
  };
};

const mapDispathToProps = (dispatch, props) => {
  return {
    clickAnswer: (disableAnswer,answersColor) => {
      dispatch(actions.clickAnswer(disableAnswer,answersColor));
    },
  };
};
export default connect(mapStatetoProps, mapDispathToProps)(Answer);
