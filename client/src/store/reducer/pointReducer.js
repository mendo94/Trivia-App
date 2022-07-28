import * as actionTypes from "../actions/actionTypes";

const initialState = {
  points: 0,
};

const pointReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POINTS:
      return {
        ...state,
        points: action.payload,
      };
    default:
      return state;
  }
};

export default pointReducer;
