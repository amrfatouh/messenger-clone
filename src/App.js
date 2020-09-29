import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import firebase from "firebase";

function App() {
  let [messages, setMessages] = useState([]);
  let [inputText, setInputText] = useState("");
  let [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("enter your username: ") || "unnamed");
  }, []);
  useEffect(() => {
    db.collection("messages")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            let x = doc.data();
            return { ...x, id: doc.id };
          })
        );
      });
  }, []);

  function addMessage(e) {
    e.preventDefault();
    if (inputText)
      db.collection("messages").add({
        username: username,
        messageText: inputText,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setInputText("");
  }

  return (
    <div className="App">
      <form onSubmit={(e) => addMessage(e)}>
        <input
          autoFocus
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        <input type="submit" value="send" />
      </form>
      {messages.map((message) => (
        <p key={message.id}>
          {message.username !== username && `${message.username}: `}
          {message.messageText}
        </p>
      ))}
    </div>
  );
}

export default App;
