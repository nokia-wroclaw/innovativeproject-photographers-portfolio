import React, { Component, useState, useEffect } from "react";
import "./Editor.scss";
import { Form, Container, Row, Col } from "reactstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ky from "ky";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditorRender from "./EditorRender";
import { IoIosPower, IoIosSettings, IoIosColorPalette } from "react-icons/io";
import { IconContext } from "react-icons";
import Navi from "../Nav";

const Editor = () => {
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPost, setPost] = useState(false);
  const [albums, setAlbums] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userInput", userInput);
    (async () => {
      await ky.post("/api/v1/editor", { body: formData });
      setPost(true);
      // window.location.reload();
    })();
  }

const GetAlbums = () => {
    (async () => {
      await ky
      .get("/api/v1/getallalbum")
      .then((response) => response.text())
      .then((data) => {
        console.log(data)
      })
    })();
  }

  useEffect(()=>{
    const kyData =async () => {
      if(isPost){
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
      setPost(false);
    }

    };
    kyData();},
  [isPost]);

   return (
    <Container
      className="mainPageBkgd"
      fluid
      style={{ paddingLeft: "0", paddingRight: "0" }}
    >
      <Navi />

      <Row style={{ paddingTop: "8%" }}>
        <Col style={{ paddingLeft: "2%" }}>
          <Form className="editor-form" onSubmit={submitHandler}>
            <Row style={{ paddingLeft: "2%" }}>
                <Col style={{ maxWidth: "10%" }}>
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
                </Col>
                <Col style = {{ maxWidth: "70%" }}>
              <p
                className="text"
                style={{ fontSize: "30px", paddingTop: "2%" }}
                >
                HTML Code
                </p>
                </Col>
                <Col style = {{ maxWidth: "15%" , paddingTop: "1%"}}>
                <div className = "dropdown">
                <button onClick = {GetAlbums} className = "dropbtn buttonLightPink darkTheme">Albums</button>
                <div class="dropdown-content">
                <a href="#">Album1</a>
                <a href="#">Album2</a>
                
                </div>
                </div>
                </Col>
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
              <Container className="render">
                <div dangerouslySetInnerHTML={{
                  __html: `${output}`,
                }}></div>
              </Container>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Editor;