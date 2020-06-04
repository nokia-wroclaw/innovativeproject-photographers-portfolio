import React, { Component } from "react";
import Navi from "../Nav";
import { Container, Row } from 'reactstrap';

const Messages = () => {
  return (
    <Container
      className="mainPageBkgd"
      fluid
      style={{ paddingLeft: "0", paddingRight: "0" }}
    >
        <Navi />
        <Row className="text-center">
        <Container
          fluid
          style={{ paddingTop: "150px", alignItems: "center", display: "flex" }}
        >
          <Container
            className="text subHeader title"
            style={{ paddingLeft: "40px" }}
          >
            Messages
          </Container>
        </Container>
      </Row>
    </Container>
  );
};

export default Messages;
