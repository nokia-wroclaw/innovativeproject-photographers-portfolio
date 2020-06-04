import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import Navi from "../Nav";

const Photos = () => {
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
            Photo Gallery
          </Container>
        </Container>
      </Row>
    </Container>
  );
};

export default Photos;
