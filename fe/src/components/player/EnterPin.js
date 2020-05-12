import React, { Component } from "react";
import {connect} from "react-redux"
import * as actions from "../../actions/actionPlayer"

import './EnterPin.css'

export class EnterPin extends Component {
  onClick = () => {
    var nickName = document.getElementById("nickName").value;
    var pin = document.getElementById("pin").value;
    const { clickSubmitPin } = this.props;
    clickSubmitPin(nickName,parseInt(pin));
  };
  render() {
    
    return (
      <div className="enterpin">
        <form
          onSubmit={function(e) {
            e.preventDefault();
          }}
          method="POST"
          className="formEnterpin"
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="nickName"
              placeholder="Nick Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="pin"
              placeholder="PIN"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => this.onClick()}
          >
            Enter
          </button>
        </form>
      </div>
    );
  }
}
const mapStatetoProps=(state)=>{
  return{
    player:state.player
  }
}

const mapDispathToProps=(dispatch,props)=>{
  return({
    clickSubmitPin:(nickName,pin)=>{
      dispatch(actions.submitPIN(nickName,pin))
    }
  })
}
export default connect(mapStatetoProps,mapDispathToProps) (EnterPin);
