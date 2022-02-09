import React, { useState } from "react";
import "./registration.css";
import { useNavigate } from "react-router-dom";
import UserServices from "../services/UserServices";

function Registration() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick = (e) => {
    if (password !== confirmPassword) {
      window.alert("Passwords do not match.");
    } else if (!username || !password || !confirmPassword) {
      window.alert("Please fill all required fields.");
    } else {
      e.preventDefault();

      try {
        let user = {
          username: username,
          password: password,
        };
        UserServices.addUser(user).then((res) => {
          window.alert("welcome " + user.username);
          console.log("User registered");
          navigate(`/home`);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="registration">
      <h1>Create Your Account</h1>
      <input
        placeholder="Username"
        type={"text"}
        required={[true, "Username required"]}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></input>
      <input
        placeholder="create password"
        type={"password"}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        required={[true, "password required"]}
      ></input>
      <input
        placeholder="confirm password"
        type={"password"}
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
      ></input>
      <button onClick={handleClick}>Register</button>
    </div>
  );
}

export default Registration;
