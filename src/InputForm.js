import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase";
import { db } from "./firebase";
import { Form, Button, Row, Col } from "react-bootstrap";
import { faThumbsUp, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function InputForm({ username }) {
  let [inputText, setInputText] = useState("");

  function addMessage(e) {
    e.preventDefault();
    db.collection("messages").add({
      username: username,
      messageText: inputText ? inputText : "👍",
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInputText("");
  }

  return (
    <Form
      onSubmit={(e) => addMessage(e)}
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        zIndex: "1000",
        backgroundColor: "#fff",
        padding: "15px",
      }}
    >
      <Row>
        <Col xs={{ span: 5, offset: 3 }}>
          <Form.Control
            autoFocus
            type="text"
            placeholder="type your message"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
        </Col>
        <Col xs={1}>
          <Button
            className="d-block w-100"
            variant="outline-primary"
            type="submit"
            style={{ border: "none" }}
          >
            <FontAwesomeIcon
              icon={inputText ? faPaperPlane : faThumbsUp}
              size="2x"
            />
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default InputForm;
