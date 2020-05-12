import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { urlAuthGoogle } from "../../constants/endPoint";
import axios from "axios";

class Google extends Component {
  googleResponse = (response) => {
    const user = {
      userName: response.profileObj.googleId,
      fullName: response.profileObj.name,
      email: response.profileObj.email,
    };
    const token = response.tokenId;
    axios.post(urlAuthGoogle, { user: user, token: token }).then((res) => {
      localStorage.setItem("token", res.data.token);
      this.props.history.push("/home");
    });
  };

  onFailure = (error) => {
    console.log(error);
  };
  render() {
    return (
      <GoogleLogin
        className="btn btn-block rounded-pill p-2 "
        clientId="100079736074-pk3glqm7jbtte8tbhmpghtb88es0be37.apps.googleusercontent.com"
        onSuccess={(res) => this.googleResponse(res)}
        onFailure={(e) => this.onFailure(e)}
      >
        Sign in with Google
      </GoogleLogin>
    );
  }
}

export default withRouter(Google);
