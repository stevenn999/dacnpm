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
          className="col-10 col-sm-3"
        >
          <div className="form-group">
            <input
              type="text"
              className="inputPIN col-12"
              id="nickName"
              placeholder="Nick Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="inputPIN col-12"
              id="pin"
              placeholder="PIN"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary col-12"
            onClick={() => this.onClick()}
          >
            <h3>Enter</h3>
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
