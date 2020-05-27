import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actionLogin";
import { urlLogin } from "../../constants/endPoint";
import axios from "axios";
import Google from "./Google";
// import Facebook from "./Facebook";
import "./Login.css";

class Login extends Component {
  onchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let { account } = this.props.login;
    let { onChange } = this.props;
    account = {
      ...account,
      [name]: value,
    };
    onChange(account);
  };

  onclick = () => {
    const { account } = this.props.login;
    axios.post(urlLogin, account).then((res) => {
      if (res.data.failLogin) alert(JSON.stringify(res.data.failLogin));
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/home");
      }
    });
  };

  render() {
    const token = localStorage.getItem("token");
    if (token) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="background p-5">
        <div className="container">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin">
              <div className="card-body">
                <form className="form-signin" method="POST" id="loginForm">
                  <img
                    src="http://pluspng.com/img-png/login-button-png-login-button-png-image-18028-872.png"
                    className="card-img mb-5"
                    alt=""
                  />
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="inputUsername"
                      name="userName"
                      className="form-control"
                      placeholder="Username"
                      autoFocus
                      onChange={this.onchange}
                    />
                    <label htmlFor="inputUsername">Username</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      name="passWord"
                      className="form-control"
                      placeholder="Password"
                      onChange={this.onchange}
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>
                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      onChange={this.onchange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember password
                    </label>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="button"
                    onClick={this.onclick}
                  >
                    Login
                  </button>

                  <Link
                    replace
                    className="d-block text-center mt-2 small"
                    to="./register"
                  >
                    Register
                  </Link>
                  <hr className="mt-5" />
                  <Google />
                  {/* <Facebook /> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispathToProps = (dispatch, props) => {
  return {
    onChange: (account) => {
      dispatch(actions.onChange(account));
    },
  };
};
export default withRouter(connect(mapStatetoProps, mapDispathToProps)(Login));
