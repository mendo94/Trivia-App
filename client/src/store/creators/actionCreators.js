import * as actionTypes from "../actions/actionTypes";

export const loadUser = (userId) => {
  return {
    type: actionTypes.LOAD_USER,
    payload: userId,
  };
};

export const loadAuth = (token) => {
  return {
    type: actionTypes.LOAD_AUTH,
    payload: token,
  };
};

export const addPoints = (points) => {
  return {
    type: actionTypes.ADD_POINTS,
    payload: points,
  };
};

export const subtractPoints = (points) => {
  return {
    type: actionTypes.SUBTRACT_POINTS,
    payload: points,
  };
};

export const calcPoints = (points) => {
  return {
    type: actionTypes.CALC_POINTS,
    payload: points,
  };
};

export const getQuestion = (question) => {
  return {
    type: actionTypes.GET_QUESTION,
    payload: question,
  };
};

export const getRankings = (rankings) => {
  return {
    type: actionTypes.GET_RANKINGS,
    payload: rankings,
  };
};

export const getRank = (rank) => {
  return {
    type: actionTypes.RANK,
    payload: rank,
  };
};
