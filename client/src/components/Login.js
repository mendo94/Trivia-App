import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState({});

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
          localStorage.setItem("jsonwebtoken", token);
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

export default Login;
