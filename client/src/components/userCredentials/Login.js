import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/creators/actionCreators";
import Button from "@mui/material/Button";
import LoginUI from "./LoginUI";

function Login(props) {
  const [user, setUser] = useState({});
  // const [showPassword, setShowPassword] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  // const { email, password } = formData;
  const Navigate = useNavigate();

  // const googleHandler = async () => {
  //   provider.setCustomParameters({ prompt: "select_account" });
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // redux action? --> dispatch({ type: SET_USER, user });
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

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
          props.onLogin(true);

          Navigate("/homepage");
        } else {
          alert(!result.success);
        }
      });
  };

  return (
    <div>
      <LoginUI />

      {/* <h1>Login</h1>
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
      <button onClick={handleLogin}>Login</button> */}
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
