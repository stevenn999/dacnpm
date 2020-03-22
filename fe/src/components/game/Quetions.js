import React, { Component } from "react";

export class Quetions extends Component {
  render() {
    const { question } = this.props;
    return (
      <div className="badge badge-danger question">
        <h2>{question}</h2>
      </div>
    );
  }
}

export default Quetions;
