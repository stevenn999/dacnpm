import React, { Component } from "react";
import { Link } from "react-router-dom";
import Quiz from "./Quiz";
import "./CreateQuiz.css";

export default class CreateQuiz extends Component {
  constructor(props) {
    super(props);
    var timeNow = Date.now();
    this.state = {
      idQuiz: timeNow,
      arrQuiz: [
        {
          question: "",
          img:
            "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6",
          answers: {
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
          },
          rightAnswer: [false, false, false, false],
          time: 0,
          score: 0,
        },
      ],
      indexQuiz: 0,
    };
  }

  addQuiz = () => {
    var arrQuiz = this.state.arrQuiz;
    arrQuiz.push({
      question: "",
      img:
        "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6",
      answers: {
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
      },
      rightAnswer: [false, false, false, false],
      time: 0,
      score: 0,
    });
    this.setState({
      arrQuiz,
    });
  };
  selectImage = (e) => {
    console.log(URL.createObjectURL(e.target.files[0]));
  };
  onChangeQuestion = (e) => {
    const value = e.target.value;
    var { arrQuiz, indexQuiz } = this.state;
    arrQuiz[indexQuiz].question = value;
    this.setState({
      arrQuiz,
    });
  };
  onChangeAnswer = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    var { arrQuiz, indexQuiz } = this.state;
    var answers = arrQuiz[indexQuiz].answers;

    answers = { ...answers, [name]: value };
    arrQuiz[indexQuiz].answers = answers;
    this.setState({
      arrQuiz,
    });
  };
  checkedRightAnswer = (e) => {
    const name = parseInt(e.target.name);
    const value = e.target.checked;
    var { arrQuiz, indexQuiz } = this.state;
    arrQuiz[indexQuiz].rightAnswer[name - 1] = value;
    this.setState({});
  };
  onChangeSelect = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    var { arrQuiz, indexQuiz } = this.state;
    var arr = arrQuiz[indexQuiz];

    arr = { ...arr, [name]: value };
    arrQuiz[indexQuiz] = arr;
    this.setState({
      arrQuiz,
    });
  };
  onClickQuiz = (i) => {
    this.setState({
      indexQuiz: i,
    });
  };
  removeQuiz = (i) => {
    var { arrQuiz, indexQuiz } = this.state;
    if (arrQuiz.length > 1) {
      if ((i === arrQuiz.length - 1 && indexQuiz > 0) || i < indexQuiz)
        indexQuiz -= 1;
      arrQuiz.splice(i, 1);
      this.setState({
        arrQuiz,
        indexQuiz,
      });
    }
  };
  render() {
    const { arrQuiz, indexQuiz } = this.state;

    const showListQuiz = () => {
      const arrQuiz = this.state.arrQuiz;

      const arr = arrQuiz.map((a, i) => {
        return (
          <Quiz
            key={i}
            index={indexQuiz + 1}
            removeQuiz={() => this.removeQuiz(i)}
            onClickQuiz={() => this.onClickQuiz(i)}
          >
            {i + 1}
          </Quiz>
        );
      });
      return arr;
    };
    return (
      <div>
        <div className="menu">
          <Link to="/home">
            <i
              className="fa fa-home fa-2x mt-2 ml-5 button-menu "
              aria-hidden="true"
            >
              Home
            </i>
          </Link>

          <button className="btn btn-success btn-save">
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
        <div className="row">
          <div className="col-2 sidebar">
            <div className="scrollBarAddQuiz">{showListQuiz()}</div>

            <i
              className="fa fa-plus fa-3x mt-2 text-success btn_add_quiz"
              aria-hidden="true"
              onClick={this.addQuiz}
            ></i>
          </div>
          <div className="col-10 create-quiz">
            <textarea
              className="txtQuestion"
              maxLength="120"
              placeholder="Nhập câu hỏi"
              name="question"
              onChange={this.onChangeQuestion}
              value={arrQuiz[indexQuiz].question}
            ></textarea>
            <div className="img-option row">
              <div className="option-mode col-3">
                <h5>Thời gian (s)</h5>
                <select
                  onChange={this.onChangeSelect}
                  name="time"
                  value={arrQuiz[indexQuiz].time}
                >
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>60</option>
                </select>
                <h5 className="mt-5">Số điểm</h5>
                <select
                  onChange={this.onChangeSelect}
                  name="score"
                  value={arrQuiz[indexQuiz].score}
                >
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>60</option>
                </select>
              </div>
              <div className="img-quiz col-4">
                <img src={arrQuiz[indexQuiz].img} alt="" />

                <label
                  htmlFor="imgChoose"
                  className="fa fa-plus fa-2x mt-2 text-success bg-light p-2"
                  aria-hidden="true"
                >
                  Thêm hình ảnh
                </label>

                <input
                  type="file"
                  id="imgChoose"
                  onChange={this.selectImage}
                  accept="image/*"
                ></input>
              </div>
            </div>

            <div className="text-Answers mt-5 row ">
              <div className="col-6 box-answer">
                <input
                  onChange={this.onChangeAnswer}
                  name="answer1"
                  className="text-Answer"
                  maxLength="100"
                  placeholder="Đáp án 1"
                  value={arrQuiz[indexQuiz].answers.answer1}
                ></input>
                <input
                  type="checkbox"
                  className="checkBox"
                  name="1"
                  onChange={this.checkedRightAnswer}
                  checked={arrQuiz[indexQuiz].rightAnswer[0]}
                ></input>
              </div>
              <div className="col-6 box-answer">
                <input
                  onChange={this.onChangeAnswer}
                  name="answer2"
                  className="text-Answer"
                  maxLength="100"
                  placeholder="Đáp án 2"
                  value={arrQuiz[indexQuiz].answers.answer2}
                ></input>
                <input
                  type="checkbox"
                  name="2"
                  onChange={this.checkedRightAnswer}
                  className="checkBox"
                  checked={arrQuiz[indexQuiz].rightAnswer[1]}
                ></input>
              </div>
              <div className="col-6 box-answer mt-3">
                <input
                  onChange={this.onChangeAnswer}
                  name="answer3"
                  className="text-Answer"
                  maxLength="100"
                  placeholder="Đáp án 3"
                  value={arrQuiz[indexQuiz].answers.answer3}
                ></input>
                <input
                  type="checkbox"
                  name="3"
                  onChange={this.checkedRightAnswer}
                  className="checkBox "
                  checked={arrQuiz[indexQuiz].rightAnswer[2]}
                ></input>
              </div>
              <div className="col-6 box-answer mt-3">
                <input
                  onChange={this.onChangeAnswer}
                  name="answer4"
                  className="text-Answer"
                  maxLength="100"
                  placeholder="Đáp án 4"
                  value={arrQuiz[indexQuiz].answers.answer4}
                ></input>
                <input
                  type="checkbox"
                  name="4"
                  onChange={this.checkedRightAnswer}
                  className="checkBox"
                  checked={arrQuiz[indexQuiz].rightAnswer[3]}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
