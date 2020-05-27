import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actionHome";
import axios from "axios";
import {
  urlVerifyToken,
  urlGetQuizByUser,
  urlDeleteQuizById,
} from "../../constants/endPoint";

import jwtDecode from "jwt-decode";
import "./Home.css";
import Quiz from "./Quiz";
import Menu from "./Menu";

class Home extends Component {
  UNSAFE_componentWillMount() {
    this.checkToken();
    const token = localStorage.getItem("token");
    const tokenDecode = jwtDecode(token);

    const { saveInfoUser } = this.props;
    saveInfoUser(tokenDecode);
    this.loadQuiz();
  }

  loadQuiz = async () => {
    const token = localStorage.getItem("token");
    const { info } = this.props.home;
    const idUser = info.idUser;
    const quiz = await axios.get(urlGetQuizByUser + `/${idUser}`, {
      headers: { "x-access-token": `${token}` },
    });
    const { saveQuiz } = this.props;
    saveQuiz(quiz.data);
  };

  checkToken = async () => {
    let token = localStorage.getItem("token");
    const ret = await axios.post(urlVerifyToken, { token: token });
    if (!ret.data) {
      localStorage.removeItem("token");
      this.props.history.push("/login");
      window.location.reload();
    }
  };
  removeQuiz = (idQuiz) => {
    axios.post(urlDeleteQuizById + `/${idQuiz}`).then((data) => {
      alert(JSON.stringify(data.data));
      this.loadQuiz();
    });
  };

  render() {
    const token = localStorage.getItem("token");
    if (token === null) {
      return <Redirect to="/login" />;
    }
    const { quiz } = this.props.home;
    const showQuiz = () => {
      return quiz.map((q, i) => {
        return (
          <Quiz
            key={i}
            nameQuiz={q.nameQuiz}
            idQuiz={q._id}
            removeQuiz={this.removeQuiz}
          ></Quiz>
        );
      });
    };
    return (
      <div>
        <Menu></Menu>
        <div className="container">{showQuiz()}</div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    home: state.home,
  };
};

const mapDispathToProps = (dispatch, props) => {
  return {
    saveInfoUser: (info) => {
      dispatch(actions.saveInfoUser(info));
    },
    saveQuiz: (quiz) => {
      dispatch(actions.saveQuiz(quiz));
    },
  };
};
export default withRouter(connect(mapStatetoProps, mapDispathToProps)(Home));
