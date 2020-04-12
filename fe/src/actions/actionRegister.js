import * as types from "../constants/ActionTypes";
export const onChange = account => {
  return {
    type: types.ON_CHANGE_REGISTER,
    account
  };
};