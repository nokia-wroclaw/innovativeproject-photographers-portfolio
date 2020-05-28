import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./MainPage.scss";
import Footer from "./Footer/Footer";
import { IoIosPower, IoIosImages, IoIosCube } from "react-icons/io";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import Navi from "./Nav";
import ky from "ky";

const MainPage = () => {

  return (
    <Container
      className="mainPageBkgd"
      fluid
      style={{ paddingLeft: "0", paddingRight: "0" }}
    >
      <Navi />
      <Row className="text-center" style={{ paddingTop: "11%" }}>
        <Col style={{ paddingLeft: "12%" }}>
          <button className="buttonLightPink darkTheme">
            <Link
              to="/mainPageAlbum"
              className="iconPink"
              style={{ textDecoration: "none" }}
            >
              <Row>
                <IconContext.Provider value={{ size: "30em" }}>
                  <IoIosImages />
                </IconContext.Provider>
              </Row>
              <Row>
                <Container className="text" style={{ fontSize: "80px" }}>
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
                <IconContext.Provider value={{ size: "30em" }}>
                  <IoIosCube />
                </IconContext.Provider>
              </Row>
              <Row>
                <Container className="text" style={{ fontSize: "80px" }}>
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

export default MainPage;
