import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";

class Google extends Component {

  googleResponse = response => {
    this.props.LoginGoogle(response)
  };
  onFailure = error => {
    this.props.onFailure(error)
  };
  render() {
    return (
      <GoogleLogin
        className="btn btn-lg btn-google btn-block"
        clientId="100079736074-pk3glqm7jbtte8tbhmpghtb88es0be37.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={(res)=>this.googleResponse(res)}
        onFailure={(e)=>this.onFailure(e)}
      />
    );
  }
}

export default Google;