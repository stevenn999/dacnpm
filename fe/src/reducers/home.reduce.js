import * as types from "../constants/ActionTypes";

var initState = {
    info:{},
    quiz:[]
};

var myReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SAVE_INFO_USER: {
      state.info=action.info
      return { ...state };
    }
    case types.SAVE_QUIZ: {
        state.quiz=action.quiz;
        return { ...state };
      }
    default:
      return state;
  }
};

export default myReducer;
