import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import UserServices from "../services/UserServices";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [passwordinput, setPasswordinput] = useState("");
  const [user, setUser] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    try {
      UserServices.getUserByUserName(userName).then((res) => {
        let temp = res.data.user;
        setUser(temp);
      });
    } catch (err) {
      console.log(err);
    }
  }, [userName, passwordinput]);

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordHandler = (e) => {
    setPasswordinput(e.target.value);
    console.log(passwordinput);
  };

  const loginUser = (e) => {
    e.preventDefault();

    if (user === undefined) {
      window.alert("User not found");
    } else {
      if (user[0].password === passwordinput) {
        window.alert(`Welcome ${user[0].username}`);
        setShowChat(true);
      } else {
        window.alert("Invalid Password. Try again.");
      }
    }
  };

  return (
    <div className="login">
      {!showChat ? (
        <>
          <div className="head">
            <h1>Welcome Aboard!</h1>
          </div>

          <form>
            <div className="form-login">
              <input
                placeholder="User Name"
                name="username"
                className="form-control"
                value={userName}
                onChange={userNameHandler}
                required={true}
              ></input>

              <input
                placeholder="Password"
                name="password"
                className="form-control"
                value={passwordinput}
                onChange={passwordHandler}
                type="password"
                required={true}
              ></input>
            </div>

            <button type="submit" onClick={loginUser}>
              Login
            </button>
            <p
              onClick={() => {
                navigate("/");
              }}
            >
              New User?
            </p>
          </form>
        </>
      ) : (
        <Home username={userName} />
      )}
    </div>
  );
}

export default Login;
