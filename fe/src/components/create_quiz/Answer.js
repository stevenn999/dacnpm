import React, { Component } from "react";

export default class Answer extends Component {
  onChangeAnswer = (e) => {
    const { onChangeAnswer } = this.props;
    onChangeAnswer(e);
  };
  checkedRightAnswer = (e) => {
    const { checkedRightAnswer } = this.props;
    checkedRightAnswer(e);
  };
  removeAnswer=()=>{
    const {removeAnswer}=this.props;
    removeAnswer();
  }

  render() {
    const { index, answer, rightAnswer } = this.props;
    return (
      <div className="col-12 box-answer mt-2">
        <i
          className="fa fa-trash btnRemove text-danger"
          onClick={this.removeAnswer}
          aria-hidden="true"
        ></i>
        <input
          onChange={(e) => this.onChangeAnswer(e)}
          name={index}
          className="text-Answer"
          placeholder={`Đáp án  ${index + 1}`}
          value={answer}
        ></input>
        <input
          type="checkbox"
          className="checkBox"
          name={index}
          checked={rightAnswer}
          onChange={this.checkedRightAnswer}
        ></input>
      
      </div>
    );
  }
}
