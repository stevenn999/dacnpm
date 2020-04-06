import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
class Register extends Component {
  render() {
    return (
      <div className="background p-1">
        <div className="container">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin">
              <div className="card-body">
                <form className="form-signin" method="POST" id="loginForm">
                  <img
                    src="https://lh3.googleusercontent.com/proxy/2yUY8bRd1oKOJgSpD5uCEOuYIOlIFWkTdlubvxfJ5K7v-9sW6Idy0aCdaAd8OQhvsgvCERwz7SAAGFFDAyqNmTiMhtKgdka-TYrK_3IXsuVeIQK0-ZlOYSJ9dF9SIH_WRA"
                    className="card-img  mb-5"
                    alt=""
                  />
                  <div className="form-label-group">
                    <input
                      type="text"
                      name="username"
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
                      name="fullname"
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
                      name="password"
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
                      name="confirmpassword"
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
                    Login
                  </button>

                  <Link className="d-block text-center mt-2 small" to="./login">
                    login
                  </Link>
                  <hr className="mt-2" />
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    <i className="fab mr-2"></i> Sign in with Google
                  </button>
                  <button
                    className="btn btn-lg btn-facebook btn-block text-uppercase"
                    type="submit"
                  >
                    <i className="fab  mr-2"></i> Sign in with Facebook
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

export default Register;
