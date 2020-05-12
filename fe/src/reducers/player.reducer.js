import * as types from "../constants/ActionTypes";
import { endPoint } from "../constants/endPoint";
import openSocket from "socket.io-client";

var initState = {
  socket: null,
  questions: null,
  numberCurrentQuestion: 0,
  score: 0,
  start: false,
  members: [],
  nickName: "",
  pin: "",
  arrRoom: [],
  isJoinRoom: false,
  disableAnswer: false,
  time: 0,
  answersColor: ["", "", "", ""],
  answersBackgroundColor: ["", "", "", ""],
};

var myReducer = (state = initState, action) => {
  switch (action.type) {
    case types.CONNECT_SOCKET_IO_PLAYER: {
      const options = {
        rememberUpgrade: true,
        transports: ["websocket"],
        secure: true,
        rejectUnauthorized: false,
      };
      const socket = openSocket(endPoint, options);

      state.socket = socket;
      return { ...state };
    }

    case types.CLICK_SUBMIT_PIN: {
      state.socket.emit("join_room", action.pin);
      state.pin = action.pin;
      state.nickName = action.nickName;
      return { ...state };
    }
    case types.IS_JOIN_ROOM: {
      state.isJoinRoom = action.isJoinRoom;
      return { ...state };
    }
    case types.SAVE_NEW_MEMBER_PLAYER: {
      state.members.push(action.newMember);
      return { ...state };
    }

    case types.IS_PLAY: {
      state.start = action.start;
      return { ...state };
    }
    case types.LOAD_QUESTIONS: {
      state.questions = action.questions;
      return { ...state };
    }
    case types.LOAD_QUESTION: {
      state.disableAnswer = false;
      state.answersColor = ["", "", "", ""];
      state.answersBackgroundColor = ["", "", "", ""];
      state.numberCurrentQuestion = action.numberCurrentQuestion;
      if (state.questions)
        state.time = state.questions[state.numberCurrentQuestion].timeAnswer;
      return { ...state };
    }
    case types.CLICK_ANSWER: {
      state.disableAnswer = action.disableAnswer;
      state.answersColor = action.answersColor;
      return { ...state };
    }
    case types.SET_TIME_QUESTION_PLAYER: {
      state.time = action.time;

      if (state.time === 0) {
        var rightAnswers = state.questions[
          state.numberCurrentQuestion
        ].rightAnswers.split(",");
        rightAnswers.forEach((rightAnswer) => {
          state.answersBackgroundColor[parseInt(rightAnswer) - 1] =
            "bg-success";
        });
        state.disableAnswer = true;
      }
      return { ...state };
    }

    default:
      return state;
  }
};

export default myReducer;
