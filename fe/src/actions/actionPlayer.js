import * as types from "../constants/ActionTypes"

export const submitPIN = (nickName,pin)=>{
    return{
        type:types.CLICK_SUBMIT_PIN,
        nickName,
        pin
    }
}

export const isJoinRoom = (isJoinRoom)=>{
    return{
        type:types.IS_JOIN_ROOM,
        isJoinRoom
    }
}

export const isPlay = (start)=>{
    return{
        type:types.IS_PLAY,
        start
    }
}
export const loadQuestions = (questions)=>{
    return{
        type:types.LOAD_QUESTIONS,
        questions
    }
}
export const loadQuestion = (numberCurrentQuestion,disableAnswer)=>{
    return{
        type:types.LOAD_QUESTION,
        numberCurrentQuestion,
        disableAnswer
    }
}
export const clickAnswer = (disableAnswer)=>{
    return{
        type:types.CLICK_ANSWER,
        disableAnswer
    }
}
export const setTimeQuestion = (time) => {
    return {
      type: types.SET_TIME_QUESTION,
      time
    };
  };
  



