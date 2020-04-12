import * as types from "../constants/ActionTypes";

var initState = {
    account:{
      userName:null,
      fullName:null,
      email:null,
      passWord:null,
      confirmPassword:null
    }
};

var myReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ON_CHANGE_REGISTER: {
      state.account=action.account;
      return { ...state };
    }
    default:
      return state;
  }
};

export default myReducer;
