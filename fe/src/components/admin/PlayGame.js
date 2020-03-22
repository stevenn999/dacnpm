import React, { Component } from "react";

export class PlayGame extends Component {
  onClick = () => {
    const { clickNext, numberQuestions, numberQuestion } = this.props;
    if (numberQuestion < numberQuestions - 1) clickNext();
  };

  render() {
    var {
      numberQuestion,
      numberMember,
      numberQuestions,
      question,
      answer,
      numberMemberAnswer,
      members
    } = this.props;

    var answers = answer.map((a, i) => {
      return (
        <button key={i} className="btn btn-secondary col-12 col-sm-5 answer">
          {a}
        </button>
      );
    });

    var showMembers = members.map((member, i) => {
      return (
        <tbody key={i}>
          <tr>
            <th scope="row">{(i += 1)}</th>
            <td>{member.nickName}</td>
            <td>{member.rightQuestion}</td>
            <td>{member.score}</td>
          </tr>
        </tbody>
      );
    });

    return (
      <div className="playgame row">
        <div className="col-12  col-sm-8 questiongame wrapper">
          <div className="badge badge-danger question">
            <h2>{question}</h2>
          </div>
          <div className="img"></div>
          <div className=" row">{answers}</div>
        </div>
        <div className="col-12 col-sm-4 statistic">
          <h1>
            Câu hỏi số: {(numberQuestion += 1)} / {numberQuestions}
          </h1>
          <h1>
            Số người trả lời:{numberMemberAnswer} /{numberMember}
          </h1>
          <button
            type="button"
            className="btn btn-primary nextquestion"
            onClick={this.onClick}
          >
            Next question{" "}
            <i className="fa fa-step-forward" aria-hidden="true"></i>
          </button>
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-bordered table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Nick Name</th>
                  <th scope="col">Số câu trả lời đúng</th>
                  <th scope="col">Điểm số</th>
                </tr>
              </thead>
              {showMembers}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayGame;
