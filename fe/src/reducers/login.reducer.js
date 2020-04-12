import * as types from "../constants/ActionTypes";

var initState = {
    account:null
};

var myReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ON_CHANGE_LOGIN: {
      state.account=action.account
      return { ...state };
    }
    default:
      return state;
  }
};

export default myReducer;
