import React, { Component } from "react";
import Quiz from "./Quiz";
import Answer from "./Answer";
import Menu from "./Menu";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { urlGetQuizById, urlUpdateQuizById } from "../../constants/endPoint";

class EditQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrQuiz: [
        {
          question: "",
          img:
            "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6",
          answers: [""],
          rightAnswers: [false],
          time: 10,
          score: 10,
        },
      ],
      idUser: "",
      nameQuiz: "",
      imgQuiz: "",
      indexQuiz: 0,
    };
  }
  UNSAFE_componentWillMount() {
    // const token = localStorage.getItem("token");

    const { idQuiz } = this.props.match.params;
    axios.get(urlGetQuizById + `/${idQuiz}`).then((data) => {
      this.setState({ ...data.data, arrQuiz: data.data.quiz });
    });
  }

  addQuiz = () => {
    var arrQuiz = this.state.arrQuiz;
    arrQuiz.push({
      question: "",
      img:
        "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6",
      answers: [""],
      rightAnswers: [false],
      time: 10,
      score: 10,
    });
    this.setState({
      arrQuiz,
    });
  };
  onChangeNameQuiz = (e) => {
    const value = e.target.value;
    this.setState({
      nameQuiz: value,
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
    const name = parseInt(e.target.name);
    const value = e.target.value;
    var { arrQuiz, indexQuiz } = this.state;
    var answers = arrQuiz[indexQuiz].answers;

    answers[name] = value;
    arrQuiz[indexQuiz].answers = answers;
    this.setState({
      arrQuiz,
    });
  };
  checkedRightAnswer = (e) => {
    const name = parseInt(e.target.name);
    const value = e.target.checked;
    var { arrQuiz, indexQuiz } = this.state;

    arrQuiz[indexQuiz].rightAnswers[name] = value;

    this.setState({
      arrQuiz,
    });
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
  removeAnswer = (i) => {
    var { arrQuiz, indexQuiz } = this.state;
    if (i > 0 || (i === 0 && arrQuiz[indexQuiz].answers.length > 1))
      arrQuiz[indexQuiz].answers.splice(i, 1);
    this.setState({
      arrQuiz,
    });
  };
  addAnswer = () => {
    let { arrQuiz, indexQuiz } = this.state;
    arrQuiz[indexQuiz].answers.push("");
    this.setState({ arrQuiz: [...arrQuiz] });
  };

  onSave = () => {
    const { idQuiz } = this.props.match.params;
    const { idUser, nameQuiz, arrQuiz, imgQuiz } = this.state;
    const entity = {
      idUser,
      nameQuiz: nameQuiz,
      quiz: [...arrQuiz],
      imgQuiz,
    };

    console.log(arrQuiz);
    axios.post(urlUpdateQuizById + `/${idQuiz}`, entity).then((data) => {
      alert("Sửa thành công");
    });
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

    const showAnswers = () => {
      const answers = arrQuiz[indexQuiz].answers;
      const rightAnswers = arrQuiz[indexQuiz].rightAnswers;
      return answers.map((answer, i) => {
        return (
          <Answer
            key={i}
            index={i}
            removeAnswer={() => this.removeAnswer(i)}
            onChangeAnswer={this.onChangeAnswer}
            rightAnswer={rightAnswers[i]}
            checkedRightAnswer={this.checkedRightAnswer}
            answer={answer}
          ></Answer>
        );
      });
    };

    return (
      <div>
        <Menu
          onSave={this.onSave}
          onChangeNameQuiz={this.onChangeNameQuiz}
          nameQuiz={this.state.nameQuiz}
        ></Menu>
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

            <div className="text-Answers mt-5 row ">{showAnswers()}</div>
            <button className="btn btn-success mt-3" onClick={this.addAnswer}>
              <i className="fa fa-plus fa-2x " aria-hidden="true">
                Thêm câu trả lời
              </i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditQuiz);
