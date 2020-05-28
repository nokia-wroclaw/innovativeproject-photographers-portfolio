import React, { Component, useState, useEffect } from "react";
import "./Editor.scss";
import { Form, Container, Row, Col } from "reactstrap";
import ky from "ky";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditorRender from "./EditorRender";
import { IoIosPower, IoIosSettings, IoIosColorPalette } from "react-icons/io";
import { IconContext } from "react-icons";


const Editor = () => {
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPost, setPost] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userInput", userInput);
    (async () => {
        await ky.post("/api/v1/editor", { body: formData }); 
        setPost(true);
    })();
  }

  useEffect(
    
    (async () => {
      //if(isPost){
    await ky
      .get("/api/v1/editor")
      .then((response) => response.text())
      .then((data) => {
        setOutput( data );
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg( "Error retrieving data" );
      });
    //}
      
    
    }),
  [/*isPost*/]);
   
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
              <Nav.Link href="/login">
                <IconContext.Provider value={{ size: "2em", color: "#077cc5" }}>
                  <IoIosPower />
                </IconContext.Provider>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Row style={{ paddingTop: "8%" }}>
          <Col style={{ paddingLeft: "2%" }}>
            <Form className="editor-form" onSubmit={submitHandler}>
              <Row style={{ paddingLeft: "2%" }}>
                <button
                  type="submit"
                  style={{ backgroundColor: "black", borderWidth: "0" }}
                >
                  <IconContext.Provider
                    value={{ size: "4em", color: "#ceb1ba" }}
                  >
                    <IoIosSettings />
                  </IconContext.Provider>
                </button>
                <span className="p-2"></span>
                <p
                  className="text"
                  style={{ fontSize: "30px", paddingTop: "2%" }}
                >
                  Jinja Code
                </p>
              </Row>
              <Row style={{ paddingLeft: "5%", paddingTop: "1%" }}>
                <textarea
                  name="userInput"
                  
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </Row>
            </Form>
          </Col>

          <Col style={{ paddingRight: "2%" }}>
            <Form className="editor-form ">
              <Row style={{ paddingLeft: "2%" }}>
                <IconContext.Provider value={{ size: "4em", color: "#ceb1ba" }}>
                  <IoIosColorPalette />
                </IconContext.Provider>
                <span className="p-2"></span>
                <p
                  className="text"
                  style={{ fontSize: "30px", paddingTop: "2%" }}
                >
                  Your Page
                </p>
              </Row>
              <Row
                style={{
                  paddingLeft: "5%",
                  paddingTop: "1%",
                  paddingRight: "5%",
                }}
              >
                <Container className="render">{output}</Container>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

export default Editor;