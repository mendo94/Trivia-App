import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/creators/actionCreators";

function Login(props) {
  const [user, setUser] = useState({});
  const Navigate = useNavigate();

  const handleTextChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    fetch("http://localhost:2000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          // token is saved to local storage
          const token = result.token;
          const username = result.username;
          const userId = result.userId;
          localStorage.setItem("jsonwebtoken", token);
          localStorage.setItem("username", username);
          localStorage.setItem("userId", userId);
          props.onLoadUser(userId);
          props.onLogin(token);

          Navigate("/homepage");
        } else {
          alert(!result.success);
        }
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        onChange={handleTextChange}
        name="username"
        placeholder="Username"
      />
      <input
        type="password"
        onChange={handleTextChange}
        name="password"
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadUser: (userId) => dispatch(actionCreators.loadUser(userId)),
    onLogin: (token) => dispatch(actionCreators.loadAuth(token)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
