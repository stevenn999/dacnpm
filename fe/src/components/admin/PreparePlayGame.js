import React, { Component } from "react";

export class PreparePlayGame extends Component {
  onClick = () => {
    const { clickStart } = this.props;
    clickStart();
  };
  render() {
    const { numberMember, members } = this.props;
    var showMembers = members.map((member, index) => {
      return (
        <button type="button" key={index} className="btn btn-danger member ">
          {member.nickName} <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      );
    });
    return (
      <div className="prepareplaygame">
        <p className="pin">PIN:6969</p>
        <div className="startgame">
          <button
            type="button"
            onClick={this.onClick}
            className="btn btn-success"
          >
            Start Game
          </button>
        </div>
        <div className="card boxmembers">
          <h2 className="card-header">Số lượng thành viên: {numberMember} </h2>
          <div className="members">{showMembers}</div>
        </div>
      </div>
    );
  }
}

export default PreparePlayGame;
