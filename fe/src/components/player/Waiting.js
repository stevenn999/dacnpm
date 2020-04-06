import React, { Component } from "react";

//...

import "./Waiting.css";

class Waiting extends Component {
  render() {
    return (
      <div className="waiting row ">
        <div className="spinner-border text-success" role="status"></div>
        <h1 className="text-danger">Đợi chủ trò bắt đầu trò chơi</h1>
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }
}

export default Waiting;
