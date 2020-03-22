import React, { Component } from "react";

export class EnterPin extends Component {
  onClick = () => {
    var nickName = document.getElementById("nickName").value;
    var pin = document.getElementById("pin").value;
    const { clickSubmit } = this.props;
    clickSubmit(nickName, parseInt(pin));
  };
  render() {
    return (
      <div className="enterpin">
        <form
          onSubmit={function(e) {
            e.preventDefault();
          }}
          method="POST"
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

export default EnterPin;
