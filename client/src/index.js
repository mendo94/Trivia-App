import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import BaseLayout from "./components/baselayout/BaseLayout";
import App from "./App";
import Registration from "./components/userCredentials/Registration";
import Login from "./components/userCredentials/Login";
import Trivia from "./components/trivia/Trivia";
import Rankings from "./components/rankings/Rankings";
import "bootstrap/dist/css/bootstrap.min.css";
import ShareUI from "./components/share/ShareUI";
import * as actionCreators from "./store/creators/actionCreators";
import userReducer from "./store/reducer/userReducer";
import pointReducer from "./store/reducer/pointReducer";
import questionReducer from "./store/reducer/questionReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const rootReducer = combineReducers({
  userReducer: userReducer,
  pointReducer: pointReducer,
  questionReducer: questionReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const token = localStorage.getItem("jsonwebtoken");
store.dispatch(actionCreators.loadAuth(token));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route path="/homepage" element={<App />} />
            <Route path="/" element={<App />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/trivia" element={<Trivia />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/challenge-friends" element={<ShareUI />} />
          </Routes>
        </BaseLayout>
        <Button />
        <ToastContainer autoClose={2000} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
