import React, { Component } from "react";
import { connect } from "react-redux";

export class Questions extends Component {
  render() {
    const { questions,numberCurrentQuestion } = this.props.player;
    const question=questions[numberCurrentQuestion].question;
    return (
      <h2 className="question">{question}</h2>
    );
  }
}

const mapStatetoProps = state => {
  return {
    player: state.player
  };
};

export default connect(mapStatetoProps, null)(Questions);
