import React, { Component } from "react";
import { Link } from "react-router-dom";
class Quiz extends Component {

  removeQuiz=()=>{
    const { idQuiz } = this.props;
    const {removeQuiz}=this.props;
    removeQuiz(idQuiz)
  }
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
                <button className="btn btn-warning buttonQuiz ">
                  <i className="fa fa-pencil " aria-hidden="true">
                    Chỉnh sửa
                  </i>
                </button>
              </Link>
              <button className="btn btn-danger buttonQuiz " onClick={this.removeQuiz}>
                <i className="fa fa-trash" aria-hidden="true">
                  Xóa
                </i>
              </button>
              <Link to={`/option_play/${idQuiz}`} target="_blank">
                <button className="btn btn-success buttonQuiz ">
                  <i className="fa fa-play" aria-hidden="true">
                    Chơi game
                  </i>
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
