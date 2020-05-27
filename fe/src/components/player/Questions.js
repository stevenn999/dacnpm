import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actionPlayer";

export class Questions extends Component {
  constructor(props) {
    super(props);
    this.idTimer = null;
  }
  componentDidMount() {
    const { questions, numberCurrentQuestion } = this.props.player;
    const t = questions[numberCurrentQuestion].time;

    const { setTimeQuestion } = this.props;
    setTimeQuestion(t);

    this.idTimer = setInterval(() => {
      this.timeCountDown();
    }, 300);
  }
  componentWillUnmount() {
    clearInterval(this.idTimer);
  }

  timeCountDown = () => {
    var { time } = this.props.player;
    const { setTimeQuestion } = this.props;
    if (time > 0) setTimeQuestion(time - 1);
  };

  render() {
    const { questions, numberCurrentQuestion, time } = this.props.player;
    const question = questions[numberCurrentQuestion].question;
    var timeCountDown = (time) => {
      var min = 0;
      var sec = 0;

      if (time >= 60) {
        min = time / 60;
        sec = time % 60;
        if (sec < 10) sec = "0" + sec;
        time = min + "" + sec;
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
      <div className="question">
        <h2 className="questionLabel">{question}</h2>
        <div className="row">
          <div className="bg-dark timecountdown">
            <span className="pl-3 text-warning">Time:</span>
            <span className="pl-3 pr-3 text-white">{timeCountDown(time)}</span>
          </div>
          <div className="bg-dark timecountdown">
            <span className="pl-3 text-warning">Tổng điểm:</span>
            <span className="pl-3 pr-3 text-white">{this.props.player.scoreTimeOut}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    player: state.player,
  };
};

const mapDispathToProps = (dispatch, props) => {
  return {
    setTimeQuestion: (time) => {
      dispatch(actions.setTimeQuestion(time));
    },
  };
};
export default connect(mapStatetoProps, mapDispathToProps)(Questions);
