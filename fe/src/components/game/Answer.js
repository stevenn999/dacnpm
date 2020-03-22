import React, { Component } from "react";

export class Answer extends Component {
 
  onClick = index => {
    const { clickAnswer } = this.props;
   
    clickAnswer(index);
  };
  render() {
    const { answer,disable } = this.props;
  

    const answers = answer.map((a, index) => {
      return (
        <button
          key={index}
          onClick={() => this.onClick(index)}
          type="button"
          disabled={disable}
          className="btn btn-secondary col-12 col-sm-5 answer"
        >
          {a}
        </button>
      );
    });

    return <div className=" row">{answers}</div>;
  }
}

export default Answer;
