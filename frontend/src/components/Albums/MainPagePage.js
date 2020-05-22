import React, { Component, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Footer from "../Footer/Footer";
import { Container, Row, Button, Col } from "reactstrap";
import "../MainPage.scss";
import { IoIosPower, IoIosAdd, IoIosImages, IoIosCube } from "react-icons/io";
import { IconContext } from "react-icons";

class MainPageAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
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
          fixed=""
        >
          <Navbar.Brand>
            <Link
              to="/mainPage"
              className="text nav"
              style={{ textDecoration: "none", color: "#077cc5" }}
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
                style={{ color: "#077cc5" }}
              >
                Photos
              </Nav.Link>
              <Nav.Link
                href="/editor"
                className="text"
                style={{ color: "#077cc5" }}
              >
                Edit Page
              </Nav.Link>
              <Nav.Link
                href="#deets"
                className="text"
                style={{ color: "#077cc5" }}
              >
                Messages
              </Nav.Link>
              <Nav.Link
                href="#deets"
                className="text"
                style={{ color: "#077cc5" }}
              >
                Settings
              </Nav.Link>
              <Nav.Link href="login">
                <IconContext.Provider value={{ size: "2em", color: "#077cc5" }}>
                  <IoIosPower />
                </IconContext.Provider>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Row>
          <Col style={{ maxWidth: "15%" }}>
            <Nav className="flex-column color-nav verticalThin">
              <Nav.Link href="/mainPageAlbum" className="text verticalNav">
                <IoIosImages />
                <span className="p-2"></span>
                My albums
              </Nav.Link>
              <Nav.Link href="/mainPagePage" className="text verticalNav">
                <IoIosCube />
                <span className="p-2"></span>
                My pages
              </Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Row className="text-center" style={{ paddingLeft: "10%" }}>
              <Container
                fluid
                style={{
                  paddingTop: "80px",
                  paddingLeft: "50px",
                  paddingRight: "50px",
                }}
              >
                <Container
                  className="text subHeader title"
                  style={{ paddingLeft: "40px" }}
                >
                  My Pages
                </Container>
              </Container>
            </Row>
            <Row
              style={{
                paddingTop: "40px",
                paddingLeft: "50px",
                paddingLeft: "10%",
                paddingTop: "5%",
              }}
            >
              <button
                onClick={this.togglePopup.bind(this)}
                className="buttonLightPink"
              >
                <IconContext.Provider
                  value={{ size: "15em", color: "#98878f" }}
                >
                  <IoIosAdd />
                </IconContext.Provider>
              </button>
              {this.state.showPopup ? (
                <Modal closePopup={this.togglePopup.bind(this)} />
              ) : null}
            </Row>
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

export default MainPageAlbum;
