import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actionHost";
import { withRouter } from "react-router-dom";

export class PlayGame extends Component {
  constructor(props) {
    super(props);
    this.idTimer = null;
  }

  componentDidMount() {
    const { questions, numberCurrentQuestion, members } = this.props.host;

    const t = questions[numberCurrentQuestion].time;

    const { setTimeQuestion, membersBeforeTimeOut } = this.props;
    membersBeforeTimeOut([...members]);
    setTimeQuestion(t);

    this.idTimer = setInterval(() => {
      this.timeCountDown();
    }, 300);

    const { socket } = this.props.host;

    socket.on("memberAnswer", (data) => {
      const { questions, numberCurrentQuestion } = this.props.host;
      const { members } = this.props.host;
      const { memberAnswer } = this.props;
      const score = parseInt(questions[numberCurrentQuestion].score);
      if (data.isRight) {
        const index = members.findIndex((m) => m.id === data.id);

        members[index] = {
          id: members[index].id,
          nickName: members[index].nickName,
          numberRightQuestion: members[index].numberRightQuestion + 1,
          score: parseInt(members[index].score) + score,
        };
        members.sort(function (a, b) {
          if (a.score > b.score) {
            return -1;
          }
          if (b.score > a.score) {
            return 1;
          }
          return 0;
        });
      }

      memberAnswer(members);
    });
  }

  onClick = () => {
    const { numberCurrentQuestion, questions, members } = this.props.host;
    const { clickNextQuestion, membersBeforeTimeOut } = this.props;
    const numberQuestion = questions.length;
    if (numberCurrentQuestion < numberQuestion - 1) {
      var membersBefore = [...members];
      membersBeforeTimeOut(membersBefore);
      clickNextQuestion();
    } else {
      this.props.history.push({
        pathname: "/player_ranking",
        state: {
          members,
        },
      });
    }
  };

  timeCountDown = () => {
    var { time } = this.props.host;
    const { setTimeQuestion } = this.props;
    if (time > 0) {
      setTimeQuestion(time - 1);
    }
  };
  componentWillUnmount() {
    clearInterval(this.idTimer);
  }

  render() {
    var {
      numberCurrentQuestion,
      questions,
      numberMembersAnswer,
      members,
      time,
      answersBackgroundColor,
      membersBeforeTimeOut,
    } = this.props.host;
    const question = questions[numberCurrentQuestion];
    const score = questions[numberCurrentQuestion].score;
    const numberQuestion = questions.length;
    const numberMembers = members.length;

    var showMembersAfterTimeOut = members.map((member, i) => {
      return (
        <tbody key={i}>
          <tr className="bg-light">
            <th scope="row">{(i += 1)} </th>
            <td>{member.nickName}</td>
            <td>{member.numberRightQuestion}</td>
            <td>{member.score}</td>
          </tr>
        </tbody>
      );
    });

    var showMembersBeforeTimeOut = membersBeforeTimeOut.map((member, i) => {
      return (
        <tbody key={i}>
          <tr className="bg-light">
            <th scope="row">{(i += 1)}</th>
            <td>{member.nickName}</td>
            <td>{member.numberRightQuestion}</td>
            <td>{member.score}</td>
          </tr>
        </tbody>
      );
    });

    var show = () => {
      if (time === 0) {
        return showMembersAfterTimeOut;
      } else {
        return showMembersBeforeTimeOut;
      }
    };

    const arr = question.answers;
    const answers = arr.map((answer, index) => {
      return (
        <button
          key={index}
          type="button"
          className={`col-10 col-sm-10 btnAnswer ${answersBackgroundColor[index]} `}
        >
          {answer}
        </button>
      );
    });

    var timeCountDown = (time) => {
      var min = 0;
      var sec = 0;

      if (time >= 60) {
        min = time / 60;
        sec = time % 60;
        if (sec < 10) sec = "0" + sec;
        time = "0" + min + "" + sec;
      } else if (time > 0) {
        min = "00";
        sec = time;
        if (sec < 10) sec = "0" + sec;
        time = min + ":" + sec;
      } else {
        time = "Hết giờ";
      }
      return time;
    };

    return (
      <div className=" row">
        <div className="col-12 col-lg-8 questionHost">
          <h2 className="questionLabel">{question.question}</h2>
          <div className="row">
            <div className="bg-dark timecountdown">
              <span className="pl-3 text-warning">Time:</span>
              <span className="pl-3 pr-3 text-white">
                {timeCountDown(time)}
              </span>
            </div>
            <div className="bg-dark timecountdown">
              <span className="pl-3 text-warning">Score:</span>
              <span className="pl-3 pr-3 text-white">{score}</span>
            </div>
          </div>

          <div className="img"></div>

          <div className="answers">{answers}</div>
        </div>
        <div className="col-12 col-lg-4 controlQuestions">
          <h1>
            Câu hỏi số: {(numberCurrentQuestion += 1)} / {numberQuestion}
          </h1>
          <h1>
            Số người trả lời:{numberMembersAnswer} /{numberMembers}
          </h1>
          <button
            type="button"
            className="btn btn-primary nextquestion"
            onClick={this.onClick}
          >
            Next question
            <i className="fa fa-step-forward" aria-hidden="true"></i>
          </button>
          <div className="table-wrapper-scroll-y my-custom-scrollbar ">
            <table className="table table-bordered table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Nick Name</th>
                  <th scope="col">Số câu trả lời đúng</th>
                  <th scope="col">Điểm số</th>
                </tr>
              </thead>
              {show()}
            </table>
          </div>
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
    setTimeQuestion: (time) => {
      dispatch(actions.setTimeQuestion(time));
    },
    membersBeforeTimeOut: (membersBeforeTimeOut) => {
      dispatch(actions.membersBeforeTimeOut(membersBeforeTimeOut));
    },

    clickNextQuestion: (numberCurrentQuestion) => {
      dispatch(actions.clickNextQuestion(numberCurrentQuestion));
    },
    memberAnswer: (members) => {
      dispatch(actions.memberAnswer(members));
    },
  };
};
export default withRouter(
  connect(mapStatetoProps, mapDispathToProps)(PlayGame)
);
