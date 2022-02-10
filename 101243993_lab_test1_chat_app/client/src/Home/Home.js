import React, { useState } from "react";
import io from "socket.io-client";
import "./home.css";
import "../Rooms/room.css";

import Room from "../Rooms/Room";

const socket = io.connect("http://localhost:3002");
let room = "";
let data = {
  room: "",
  username: "",
};
function Home({ username }) {
  const [showChat, setShowChat] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    room = e.target.value;
    data = { room: room, username: username };
    socket.emit("join_room", data);
    setShowChat(true);
  };

  return (
    <div className="home">
      {!showChat ? (
        <div className="chat-container">
          <h1>Join a room</h1>
          <ul>
            <li>
              <button
                onClick={handleClick}
                value={"news"}
                style={{ background: "lightGreen" }}
              >
                News
              </button>
            </li>
            <li>
              <button
                onClick={handleClick}
                value={"covid-19"}
                style={{ background: "orange" }}
              >
                Covid-19
              </button>
            </li>
            <li>
              <button
                onClick={handleClick}
                value={"nodejs"}
                style={{ background: "gold" }}
              >
                NodeJs
              </button>
            </li>
          </ul>{" "}
        </div>
      ) : (
        <Room socket={socket} room={room} username={username} />
      )}
    </div>
  );
}

export default Home;
