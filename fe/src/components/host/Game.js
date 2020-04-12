import React, { Component } from "react";
import PlayGame from "./PlayGame";
import { withRouter, Redirect } from "react-router-dom";
import PreparePlayGame from "./PreparePlayGame";
import axios from "axios";
import { urlVerifyToken } from "../../constants/endPoint";
import { connect } from "react-redux";

import "./Game.css";

export class Game extends Component {
  UNSAFE_componentWillMount() {
    this.checkToken();
  }

  checkToken = async () => {
    let token = localStorage.getItem("token");
    const ret = await axios.post(urlVerifyToken, { token: token });
    if (!ret.data) {
      localStorage.removeItem("token");
      this.props.history.push("/login");
      window.location.reload();
    }
  };

  render() {
    let token = localStorage.getItem("token");
    if (token) {
      const { startPlay } = this.props.host;
      if (startPlay) {
        return <PlayGame />;
      } else {
        return <PreparePlayGame />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStatetoProps = (state) => {
  return {
    host: state.host,
  };
};

export default withRouter(connect(mapStatetoProps, null)(Game));
