import React, { Component } from "react";

export default class Quiz extends Component {
  onClick = () => {
    const { onClickQuiz } = this.props;
    onClickQuiz();
  };
  removeQuiz=()=>{
    const {removeQuiz}=this.props;
    removeQuiz();
  }
  render() {
    const { index } = this.props;
    const indexQuiz = this.props.children;
    return (
      <div className="boxQuiz">
        <i className="fa fa-trash btnRemove text-danger" onClick={this.removeQuiz} aria-hidden="true"></i>
        <div
          className={index === indexQuiz ? "QuizClick" : "Quiz"}
          onClick={this.onClick}
        >
          Câu {indexQuiz}
        </div>
      </div>
    );
  }
}
