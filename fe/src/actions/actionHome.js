import * as types from "../constants/ActionTypes";
export const saveInfoUser = (info) => {
  return {
    type: types.SAVE_INFO_USER,
    info,
  };
};

export const saveQuiz = (quiz) => {
    return {
      type: types.SAVE_QUIZ,
      quiz,
    };
  };
