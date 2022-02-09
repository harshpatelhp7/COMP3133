import React from "react";

function Login() {
  return (
    <div className="login">
      <h1>Login into your Account</h1>
      <input placeholder="Username" type="text"></input>
      <input placeholder="password" type="password"></input>
      <button type="submit">Login</button>
    </div>
  );
}

export default Login;
