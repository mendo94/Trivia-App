import * as actionTypes from "../actions/actionTypes";

const initialState = {
  points: 0,
  rankings: [],
  sortedRankings: [],
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
    case actionTypes.GET_RANKINGS:
      return {
        ...state,
        rankings: action.payload,
      };
    case actionTypes.GET_SORTED_RANKINGS:
      return {
        ...state,
        sortedRankings: state.sortedRankings.concat(action.payload),
      };
    default:
      return state;
  }
};

export default pointReducer;
