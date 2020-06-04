import React, { Component, useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Footer from "../Footer/Footer";
import { Container, Row, Button, Col } from "reactstrap";
import "../MainPage.scss";
import { IoIosPower, IoIosAdd, IoIosImages, IoIosCube } from "react-icons/io";
import { IconContext } from "react-icons";
import Navi from "../Nav";
import ListAlbumForm from "./ListAlbumForm";
import ky from "ky";

const MainPageAlbum = () => {
  const [userPages, setUserPages] = useState([]);
  const [page, setPage] = useState("");
  const [isPost, setPost] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const addAlbumHandler = pages => {
    setPage(pages);
    const formData = new FormData();
    formData.append("page_name", page);
    (async () => {
      await ky.post("/api/v1/mainpage", { body: formData });
      setPost(true);
    })();
  };

  useEffect(() => {
    const kyData = async () => {
      if (isPost) {
        await ky
          .get("/api/v1/mainpage")
          .then((response) => response.text())
          .then((data) => {
            setUserPages(prevAlbums => [...prevAlbums,
            { id: data.name, ...page }]);
          })
          .catch((error) => {
            console.log(error);
            setErrorMsg("Error retrieving data");
          });
        setPost(false);
      }

    };
    kyData();
  },
    [isPost]);
  return (
    <Container className="mainPageBkgd" fluid style={{ paddingLeft: '0', paddingRight: '0' }}>
      <Navi />
      <Row>
        <Col style={{ maxWidth: "15%" }}>
          <Nav className="flex-column color-nav verticalThin" fixed="left">
            <Nav.Link href="/mainPageAlbum" className="text verticalNav">
              <IconContext.Provider value={{ color: "whitesmoke" }}>
                <IoIosImages />
              </IconContext.Provider>
              <span className="p-2"></span>
              My albums
            </Nav.Link>
            <Nav.Link href="/mainPagePage" className="text verticalNav">
              <IconContext.Provider value={{ color: "whitesmoke" }}>
                <IoIosCube />
              </IconContext.Provider>
              <span className="p-2"></span>
              My pages
            </Nav.Link>
          </Nav>
        </Col>
        <Col>
          <Row className="text-center">
            <Container
              fluid
              style={{
                paddingTop: "150px",
                alignItems: "center",
                display: "flex",
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
          <Row className="text-center" style={{ paddingTop: "5%" }}>
            <ListAlbumForm onAddAlbum={addAlbumHandler} />
          </Row>
        </Col>
      </Row>
      <Container fluid style={{ position: 'fixed', bottom: '0', paddingLeft: '0', paddingRight: '0' }}>
        <Footer />
      </Container>
    </Container>

  );
}

export default MainPageAlbum;
