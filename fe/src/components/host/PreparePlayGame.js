import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actionHost";
import axios from "axios";
import { urlGetQuizById } from "../../constants/endPoint";
import { withRouter } from "react-router-dom";

export class PreparePlayGame extends Component {
  componentDidMount() {
    //Kết nối Host với SocketIo
    const { connectSocketIoHost } = this.props;
    connectSocketIoHost();
    //Load câu hỏi từ database lưu về state host
    this.loadQuestions();

    const { socket, pin } = this.props.host;

    socket.emit("creat_room", pin);

    socket.on("newMember", (newMember) => {
      const { saveNewMember } = this.props;
      saveNewMember(newMember);
    });

    socket.on("memberExit", (data) => {
      var { members } = this.props.host;
      let index = members.findIndex((m) => m.nickName === data);
      if (index > -1) {
        members.splice(index, 1);
        const { memberExit } = this.props;
        memberExit(members);
      }
    });
  }

  loadQuestions = async () => {
    const { getQuestions } = this.props;
    const token = localStorage.getItem("token");
    const { idQuiz } = this.props.match.params;

    const questions = await axios.get(urlGetQuizById + `/${idQuiz}`, {
      headers: { "x-access-token": `${token}` },
    });
    getQuestions(questions.data.quiz);
  };

  onClick = async () => {
    const { socket, questions } = this.props.host;
    const { clickStartGame } = this.props;
    socket.emit("questions", questions);
    socket.emit("start", true);
    clickStartGame(true);
  };

  leaveRoom = (id) => {
    const { socket } = this.props.host;
    socket.emit("leave_room", id);
  };

  render() {
    const { members, pin } = this.props.host;
    const numberMember = members.length;
    var showMembers = members.map((member, index) => {
      return (
        <button
          type="button"
          key={index}
          onClick={() => this.leaveRoom(member.id)}
          className="btn btn-danger member "
        >
          {member.nickName} <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      );
    });
    return (
      <div className="prepareplaygame">
        <p className="pin">PIN:{pin}</p>
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
const mapStatetoProps = (state) => {
  return {
    host: state.host,
  };
};

const mapDispathToProps = (dispatch, props) => {
  return {
    connectSocketIoHost: () => {
      dispatch(actions.connectSocketIoHost());
    },
    getQuestions: (questions) => {
      dispatch(actions.getQuestions(questions));
    },
    clickStartGame: (playStart) => {
      dispatch(actions.clickStartGame(playStart));
    },
    saveNewMember: (newMember) => {
      dispatch(actions.saveNewMember(newMember));
    },
    memberExit: (members) => {
      dispatch(actions.memberExit(members));
    },
  };
};
export default withRouter(
  connect(mapStatetoProps, mapDispathToProps)(PreparePlayGame)
);
