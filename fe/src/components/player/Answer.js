import React, { Component } from "react";
import * as actions from "../../actions/actionPlayer";
import { connect } from "react-redux";
import "./Answer.css";

export class Answer extends Component {
  onClick = (index) => {
   
    let { playerAnswer } = this.props.player;
    playerAnswer[index] = !playerAnswer[index];
    const { playerClickButtonAnswer } = this.props;
    playerClickButtonAnswer(playerAnswer);

  };

  render() {
    const {
      questions,
      numberCurrentQuestion,
      disableAnswer,
      answersBackgroundColor,
    } = this.props.player;
    const question = questions[numberCurrentQuestion];
    const arr = question.answers;
    const answers = arr.map((answer, index) => {
      var { playerAnswer } = this.props.player;
      return (
        <button
          key={index}
          onClick={() => this.onClick(index)}
          type="button"
          disabled={disableAnswer}
          className={`col-10 col-sm-10 btnAnswer  ${
            playerAnswer[index] ? "text-danger" : ""
          } ${answersBackgroundColor[index]} `}
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
   
    playerClickButtonAnswer: (playerAnswer) => {
      dispatch(actions.playerClickButtonAnswer(playerAnswer));
    },
  };
};
export default connect(mapStatetoProps, mapDispathToProps)(Answer);
