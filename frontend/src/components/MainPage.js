import React, { Component, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import "./MainPage.scss";
import Footer from "./Footer/Footer";
import { IoIosPower, IoIosImages, IoIosCube } from "react-icons/io";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

class MainPage extends Component {
  render() {
    return (
      <Container
        className="mainPageBkgd"
        fluid
        style={{ paddingLeft: "0", paddingRight: "0" }}
      >
        <Navbar
          collapseOnSelect
          expand="xl"
          className="color-nav"
          variant="dark"
          fixed="top"
        >
          <Navbar.Brand>
            <Link
              href="/mainPage"
              className="text nav"
              style={{ textDecoration: "none", color: "whitesmoke" }}
            >
              Jan Kowalski
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link
                href="#deets"
                className="text"
                style={{ color: "whitesmoke" }}
              >
                Photos
              </Nav.Link>
              <Nav.Link
                href="/editor"
                className="text"
                style={{ color: "whitesmoke" }}
              >
                Edit Page
              </Nav.Link>
              <Nav.Link
                href="#deets"
                className="text"
                style={{ color: "whitesmoke" }}
              >
                Messages
              </Nav.Link>
              <Nav.Link
                href="#deets"
                className="text"
                style={{ color: "whitesmoke" }}
              >
                Settings
              </Nav.Link>
              <Nav.Link href="/login">
                <IconContext.Provider value={{ size: "2em", color: "#7dbcff" }}>
                  <IoIosPower />
                </IconContext.Provider>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Row className="text-center" style={{ paddingTop: "11%" }}>
          <Col style={{ paddingLeft: "12%" }}>
            <button className="buttonLightPink darkTheme">
              <Link
                to="/mainPageAlbum"
                className="iconPink"
                style={{ textDecoration: "none" }}
              >
                <Row>
                  <IconContext.Provider value={{ size: "25em" }}>
                    <IoIosImages />
                  </IconContext.Provider>
                </Row>
                <Row>
                  <Container className="text" style={{ fontSize: "60px" }}>
                    My Albums
                  </Container>
                </Row>
              </Link>
            </button>
          </Col>
          <Col style={{ paddingRight: "12%" }}>
            <button className="buttonLightPink darkTheme">
              <Link
                to="/mainPagePage"
                className="iconPink"
                style={{ textDecoration: "none" }}
              >
                <Row>
                  <IconContext.Provider value={{ size: "25em" }}>
                    <IoIosCube />
                  </IconContext.Provider>
                </Row>
                <Row>
                  <Container className="text" style={{ fontSize: "60px" }}>
                    My Pages
                  </Container>
                </Row>
              </Link>
            </button>
          </Col>
        </Row>
        <Container
          fluid
          style={{
            position: "fixed",
            bottom: "0",
            paddingLeft: "0",
            paddingRight: "0",
          }}
        >
          <Footer />
        </Container>
      </Container>
    );
  }
}

export default MainPage;
