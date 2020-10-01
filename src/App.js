import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { db } from "./firebase";

import InputForm from "./InputForm";
import MessagesContainer from "./MessagesContainer";
import ChangeName from "./ChangeName";

function App() {
  let [messages, setMessages] = useState([]);
  let [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("enter your username: ") || "unnamed");
  }, []);

  useEffect(() => {
    db.collection("messages")
      .orderBy("time")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            let x = doc.data();
            return { ...x, id: doc.id };
          })
        );
      });
  }, []);

  useEffect(() => {
    let last = document.querySelector(".messages-container").lastElementChild;
    if (last) last.scrollIntoView();
  }, [messages]);

  return (
    <div className="App">
      <div className="test"></div>
      <img
        className="my-3"
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=40&h=40"
        alt=""
      />
      <h2 className="mb-4">Messenger</h2>

      <InputForm username={username} />
      <MessagesContainer username={username} messages={messages} />

      <ChangeName setUsername={setUsername} />
    </div>
  );
}

export default App;
