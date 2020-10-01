import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function ChangeName({ setUsername }) {
  const [show, setShow] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChangeName = () => {
    handleClose();
    setUsername(inputText);
    setInputText("");
  };

  useEffect(() => {
    setTimeout(() => {
      if (show) document.querySelector(".modal input").focus();
      else document.querySelector(".main-input").focus();
    }, 100);
  }, [show]);

  return (
    <div>
      <Button
        className="login-btn position-absolute"
        variant="primary"
        onClick={handleShow}
        style={{ top: 30, right: 30 }}
      >
        Change Name
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>change your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangeName();
            }}
          >
            <Form.Group className="text-left" controlId="formBasicText">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new name"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangeName}>
            Change Name
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChangeName;
