import React, { Component } from "react";
import { Link,Redirect  } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actionRegister";
import { urlRegister } from "../../constants/endPoint";
import axios from "axios";
import "./Login.css";
class Register extends Component {


  accountInvalid = (account) => {
    if (
      account.userName != null &&
      account.fullName != null &&
      account.email != null &&
      account.confirmPassword != null &&
      account.passWord === account.confirmPassword
    )
      return true;
    return false;
  };

  onclick = () => {
    const { account } = this.props.register;
    const acc={...account}
    if (this.accountInvalid(account)) {
      delete acc.confirmPassword;
      axios.post(urlRegister, acc).then((res) => {
        alert(res.data);
      });
    } else {
      alert("Bạn phải điền đầy đủ thông tin");
    }
  };
  onchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let { account } = this.props.register;
    let { onChange } = this.props;
    account = {
      ...account,
      [name]: value,
    };
    onChange(account);
  };

  render() {
    const token = localStorage.getItem("token");
    if (token) {
      return <Redirect to="/playgame" />;
    }
    return (
      <div className="background p-1">
        <div className="container">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin">
              <div className="card-body">
                <form className="form-signin" method="POST" id="loginForm">
                  <img
                    src="https://www.pngmart.com/files/3/Register-Button-Transparent-Background.png"
                    className="card-img  mb-5"
                    alt=""
                  />
                  <div className="form-label-group">
                    <input
                      type="text"
                      name="userName"
                      id="inputUsername"
                      className="form-control"
                      placeholder="Username"
                      autoFocus
                      onChange={this.onchange}
                    />
                    <label htmlFor="inputUsername">Username</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="text"
                      name="fullName"
                      id="inputFullname"
                      className="form-control"
                      placeholder="Full name"
                      onChange={this.onchange}
                    />
                    <label htmlFor="inputFullname">Full name</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="email"
                      name="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      onChange={this.onchange}
                    />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>
                  <hr />
                  <div className="form-label-group">
                    <input
                      type="password"
                      name="passWord"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      onChange={this.onchange}
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="inputConfirmPassword"
                      className="form-control"
                      placeholder="Password"
                      onChange={this.onchange}
                    />
                    <label htmlFor="inputConfirmPassword">
                      Confirm password
                    </label>
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
                    Register
                  </button>

                  <Link className="d-block text-center mt-2 small" to="./login">
                    login
                  </Link>
                  <hr className="mt-2" />
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    <i className="fa fa-google" aria-hidden="true"></i> Sign in
                    with Google
                  </button>
                  <button
                    className="btn btn-lg btn-facebook btn-block text-uppercase"
                    type="submit"
                  >
                    <i
                      className="fa fa-facebook-official"
                      aria-hidden="true"
                    ></i>{" "}
                    Sign in with Facebook
                  </button>
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
    register: state.register,
  };
};

const mapDispathToProps = (dispatch, props) => {
  return {
    onChange: (account) => {
      dispatch(actions.onChange(account));
    },
  };
};
export default connect(mapStatetoProps, mapDispathToProps)(Register);
