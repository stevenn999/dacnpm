import React, { Component } from "react";
import PlayGame from "./PlayGame";
import PreparePlayGame from "./PreparePlayGame";


import { connect } from "react-redux";

import "./Game.css";

export class Game extends Component {
  
  render() {
    const { startPlay } = this.props.host;
    if (startPlay) {
      return <PlayGame />;
    } else {
      return <PreparePlayGame />;
    }
  }
}

const mapStatetoProps = state => {
  return {
    host: state.host
  };
};


export default connect(mapStatetoProps, null)(Game);
