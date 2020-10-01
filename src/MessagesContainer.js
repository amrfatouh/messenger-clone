import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function MessagesContainer({ username, messages }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="messages-container offset-xs-3 col-xs-6">
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
                  {message.messageText === "👍" ? (
                    <FontAwesomeIcon icon={faThumbsUp} size="2x" />
                  ) : (
                    message.messageText
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MessagesContainer;
