import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

import BaseLayout from "./components/baselayout/BaseLayout";
import App from "./App";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Trivia from "./components/trivia/Trivia";
import Rankings from "./components/rankings/Rankings";
import "bootstrap/dist/css/bootstrap.min.css";

import * as actionCreators from "./store/creators/actionCreators";
import userReducer from "./store/reducer/userReducer";
import pointReducer from "./store/reducer/pointReducer";
import questionReducer from "./store/reducer/questionReducer";

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
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
