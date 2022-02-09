import React, { useState, useEffect } from "react";
import "./room.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Home from "../Home/Home";

function Room({ socket, room, id }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showChat, setShowChat] = useState(true);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: id,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const handleClick = () => {
    setShowChat(false);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      {showChat ? (
        <>
          <h1>Welcome to {room} </h1>
          <p className="chat-header">Live Chat</p>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent) => {
                return (
                  <div
                    className="message"
                    id={id === messageContent.author ? "other" : "you"}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <button className="leaveRoom" onClick={handleClick}>
            Leave Room
          </button>{" "}
        </>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default Room;
