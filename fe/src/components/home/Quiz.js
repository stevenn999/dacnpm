import React, { Component } from "react";
import { Link } from "react-router-dom";
class Quiz extends Component {
  removeQuiz = () => {
    const { idQuiz } = this.props;
    const { removeQuiz } = this.props;
    removeQuiz(idQuiz);
  };
  render() {
    const { idQuiz } = this.props;
    return (
      <div className="mt-5">
        <div className="storeQuiz">
          <img
            className="img-storeQuiz"
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            alt="img"
          />
          <div className="box-store">
            <h2 className="mt-2 ml-5">{this.props.nameQuiz}</h2>
            <div className="menu-button">
              <Link to={`/edit/${idQuiz}`}>
                <button className="btn  buttonQuiz ">
                  <i className="fa fa-pencil mr-2" aria-hidden="true"></i>
                  Chỉnh sửa
                </button>
              </Link>
              <button className="btn buttonQuiz " onClick={this.removeQuiz}>
                <i className="fa fa-trash mr-2" aria-hidden="true"></i>
                Xóa
              </button>
              <Link to={`/option_play/${idQuiz}`} target="_blank">
                <button className="btn buttonQuiz buttonPlay ">
                  <i className="fa fa-play mr-2" aria-hidden="true"></i>
                  Chơi game
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Quiz;
