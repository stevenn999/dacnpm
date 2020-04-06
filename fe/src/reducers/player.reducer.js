import * as types from "../constants/ActionTypes";
import { endPoint } from "../const";
import openSocket from "socket.io-client";

var options = {
  rememberUpgrade: true,
  transports: ["websocket"],
  secure: true,
  rejectUnauthorized: false
};
var socket = openSocket(endPoint, options);

var intialState = {
  socket: socket,
  questions: null,
  numberCurrentQuestion: 0,
  score: 0,
  start: false,
  nickName: "",
  pin: "",
  arrRoom: [],
  isJoinRoom: false,
  disableAnswer: false
};

var myReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.CLICK_SUBMIT_PIN: {
      state.socket.emit("join_room", action.pin);
      state.socket.emit("nickName", action.nickName);
      state.pin = action.pin;
      state.nickName = action.nickName;

      return { ...state };
    }
    case types.IS_JOIN_ROOM: {
      state.isJoinRoom = action.isJoinRoom;
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
      state.numberCurrentQuestion = action.numberCurrentQuestion;
      state.disableAnswer = action.disableAnswer;
      return { ...state };
    }
    case types.CLICK_ANSWER: {
      state.disableAnswer = action.disableAnswer;
      return { ...state };
    }

    default:
      return state;
  }
};

export default myReducer;
