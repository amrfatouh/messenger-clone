import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { db } from "./firebase";
import firebase from "firebase";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

function App() {
  let [messages, setMessages] = useState([]);
  let [inputText, setInputText] = useState("");
  let [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(/*prompt("enter your username: ") || "unnamed"*/ "amr");
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

  function addMessage(e) {
    e.preventDefault();
    if (inputText) {
      db.collection("messages").add({
        username: username,
        messageText: inputText,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInputText("");
  }

  return (
    <div className="App">
      <img
        className="my-3"
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=40&h=40"
        alt=""
      />
      <h2 className="mb-4">Messenger</h2>
      <Form
        onSubmit={(e) => addMessage(e)}
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
        }}
      >
        <Row>
          <Col xs={{ span: 6, offset: 2 }}>
            <Form.Control
              autoFocus
              type="text"
              placeholder="type your message"
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            />
          </Col>
          <Col xs={2}>
            <Button className="d-block w-100" variant="primary" type="submit">
              Send
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="messages-container">
        {messages.map((message) => {
          const isCurrentUser = username === message.username;
          return (
            <Card
              key={message.id}
              className={`mb-2 w-75 ${isCurrentUser ? "ml-auto" : null}`}
              bg={isCurrentUser ? "primary" : "light"}
              text={isCurrentUser ? "white" : "dark"}
            >
              <Card.Body>
                {!isCurrentUser && `${message.username}: `}
                {message.messageText}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default App;
