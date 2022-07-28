import * as actionTypes from "../actions/actionTypes";

const initialState = {
  question: [],
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_QUESTION:
      return {
        ...state,
        question: action.payload,
      };
    default:
      return state;
  }
};

export default questionReducer;
