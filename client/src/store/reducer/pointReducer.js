import * as actionTypes from "../actions/actionTypes";

const initialState = {
  points: 0,
  rankings: [],
  rank: [],
};

const pointReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POINTS:
      return {
        ...state,
        points: action.payload + 10,
      };
    case actionTypes.SUBTRACT_POINTS:
      return {
        ...state,
        points: action.payload - 10,
      };
    case actionTypes.CALC_POINTS:
      return {
        ...state,
        points: action.payload,
      };
    case actionTypes.GET_RANKINGS:
      return {
        ...state,
        rankings: action.payload,
      };
    case actionTypes.RANK:
      return {
        ...state,
        rank: action.payload,
      };

    default:
      return state;
  }
};

export default pointReducer;
