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

export const getQuestion = (question) => {
  return {
    type: actionTypes.GET_QUESTION,
    payload: question,
  };
};