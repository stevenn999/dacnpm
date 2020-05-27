import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
export default class Menu extends Component {
  onSave = () => {
    const { onSave } = this.props;
    onSave();
  };
  onChangeNameQuiz = (e) => {
    const { onChangeNameQuiz } = this.props;
    onChangeNameQuiz(e);
  };
  render() {
    return (
      <div className="menuCreteQuiz">
        <div className="nameQuiz ml-5">
          <h3 className="labelNameQuiz ml-4">Tên Quiz</h3>
          <input
            type="text"
            className="txtNameQuiz ml-4"
            onChange={(e)=>this.onChangeNameQuiz(e)}
            placeholder="Nhập tên bộ câu hỏi"
          ></input>
        </div>
        <div>
          <button className="btn btn-success btn-save" onClick={this.onSave}>
            <i className="fa fa-floppy-o fa-2x " aria-hidden="true">
              Lưu
            </i>
          </button>
          <Link to="/home">
            <button className="btn btn-danger btn-save">
              <i className="fa fa-times fa-2x " aria-hidden="true">
                Thoát
              </i>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
