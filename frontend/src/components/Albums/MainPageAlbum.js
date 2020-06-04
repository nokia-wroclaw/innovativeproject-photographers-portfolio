import React, { useState, setStatus, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Container, Row, Button, Col } from "reactstrap";
import Footer from "../Footer/Footer";
import ListAlbum from "./ListAlbum";
import "../MainPage.scss";
import { IoIosImages, IoIosCube } from "react-icons/io";
import { IconContext } from "react-icons";
import Navi from "../Nav";
import ListAlbumForm from "./ListAlbumForm";
import ky from "ky";

const MainPageAlbum = () => {
  const [userAlbums, setUserAlbums] = useState([]);
  const [album, setAlbum] = useState("");
  const [isPost, setPost] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const addAlbumHandler = albums =>{
    setAlbum(albums);
    const formData = new FormData();
    formData.append("album_name", album);
    (async () => {
      await ky.post("/api/v1/album", { body: formData });
      setPost(true);
    })();
  };

  useEffect(()=>{
    const kyData =async () => {
      if(isPost){
    await ky
      .get("/api/v1/album")
      .then((response) => response.text())
      .then((data) => {
        setUserAlbums(prevAlbums => [...prevAlbums, 
          {id: data.name, ...album}]);
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
      className="mainPageBkgd scroll"
      fluid
      style={{ paddingLeft: "0", paddingRight: "0" }}
    >
      <Navi />
      <Row>
        <Col style={{ maxWidth: "15%" }}>
          <Nav className="flex-column color-nav verticalThin" fixed="left">
            <Nav.Link href="/mainPageAlbum" className="text verticalNav">
              <IconContext.Provider value={{ color: "#ceb1ba" }}>
                <IoIosImages />
              </IconContext.Provider>
              <span className="p-2"></span>
              My albums
            </Nav.Link>
            <Nav.Link href="/mainPagePage" className="text verticalNav">
              <IconContext.Provider value={{ color: "#ceb1ba" }}>
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
                My Albums
              </Container>
            </Container>
          </Row>
          <Row className="text-center" style={{ paddingTop: "5%" }}>
            <ListAlbumForm onAddAlbum={addAlbumHandler} />
          </Row>
          <Row style={{ paddingLeft: "15%", paddingTop: "5%" }}>
            <Col><ListAlbum albums={userAlbums} onRemoveItem={() => {}}/></Col>
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

export default MainPageAlbum;
