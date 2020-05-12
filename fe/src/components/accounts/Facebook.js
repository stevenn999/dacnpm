import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { urlAuthFacebook } from "../../constants/endPoint";
import axios from "axios";

class Facebook extends Component {
  facebookResponse = async (response) => {
    const user = {
      userName: response.id,
      fullName: response.name,
      email: response.email,
    };
    const token = response.accessToken;
    await axios
      .post(urlAuthFacebook, { user: user, token: token })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);

        this.props.history.push("/home");
      });
  };

  render() {
    return (
      <FacebookLogin
        cssClass="btn btn-block text-light bg-primary mt-3"
        appId="336977640609639"
        autoLoad={false}
        fields="name,email,picture"
        callback={this.facebookResponse}
      />
      
    );
  }
}

export default withRouter(Facebook);
