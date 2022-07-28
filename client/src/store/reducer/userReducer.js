import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: "",
  isAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER:
      return {
        ...state,
        userId: action.payload,
      };
    case actionTypes.LOAD_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload != null,
      };
    default:
      return state;
  }
};

export default reducer;
