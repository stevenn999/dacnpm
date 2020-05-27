import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./OptionPlay.css";

class OptionPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { idQuiz } = this.props.match.params;
    console.log(idQuiz);
    return (
      <div className="box-option-game">
        <Link to={`/play_game/${idQuiz}`}>
          <button className="btn btn-danger mb-5">Chơi game</button>
        </Link>

        <div className="card option-game">
          <h2 className="card-header text-center bg-warning"> Chế độ chơi</h2>
          <div className="members option">
            <div className="custom-control custom-radio mt-3">
              <input
                type="radio"
                id="game-mode-1"
                name="game-mode"
                defaultChecked
                className="custom-control-input"
              />
              <label className="custom-control-label " htmlFor="game-mode-1">
                Tính điểm
              </label>
            </div>
            <div className="custom-control custom-radio mt-3">
              <input
                type="radio"
                id="game-mode-2"
                name="game-mode"
                className="custom-control-input"
              />
              <label className="custom-control-label" htmlFor="game-mode-2">
                Loại trực tiếp
              </label>
            </div>
          </div>
        </div>
        <div className="card option-score">
          <h2 className="card-header text-center bg-warning">
            Cách tính điểm mỗi câu hỏi
          </h2>
          <div className="members option">
            <div className="custom-control custom-radio mt-3">
              <input
                type="radio"
                className="custom-control-input"
                id="score-mode-1"
                name="score-mode"
                defaultChecked
              />
              <label className="custom-control-label" htmlFor="score-mode-1">
                Điểm tùy chọn(mặc định của mỗi câu hỏi)
              </label>
            </div>

            <div className="custom-control custom-radio mt-3">
              <input
                type="radio"
                className="custom-control-input"
                id="score-mode-2"
                name="score-mode"
              />
              <label className="custom-control-label" htmlFor="score-mode-2">
                Điểm dựa vào số người trả lời sai
              </label>
            </div>

            <div className="custom-control custom-radio mt-3">
              <input
                type="radio"
                className="custom-control-input"
                id="score-mode-3"
                name="score-mode"
              />
              <label className="custom-control-label" htmlFor="score-mode-3">
                Điểm dựa vào thời gian trả lời câu hỏi
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(OptionPlay);
