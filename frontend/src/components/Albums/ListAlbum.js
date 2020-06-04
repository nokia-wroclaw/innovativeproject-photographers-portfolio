import React from "react";
import { IoIosTrash, IoIosCamera } from "react-icons/io";
import { IconContext } from "react-icons";
import { Container, Col, Row } from "reactstrap";

const ListAlbum = (props) => {
  return (
    <Col >
      {props.albums.map((alb) => (
        <div className="list" key={alb.id}>
          <Row style={{ paddingBottom: "2%" }}>
            <Col style={{ maxWidth: "330px" }}>
              <button
                className="buttonLightPink darkTheme"
                style={{ height: "320px", width: "320px" }}
              >
                <Row className="float-right">
                  <div className="float-right" style={{ bottom: "0", paddingRight: "15px", paddingTop: "10px" }}>
                    <button
                      onClick={props.onRemoveItem.bind(this, alb.id)}
                      style={{ borderWidth: "0", backgroundColor: "#1a1a1a" }}
                    >
                      <IconContext.Provider
                        value={{ size: "2em", color: "#7dbcff" }}
                      >
                        <IoIosTrash />
                      </IconContext.Provider>
                    </button>

                  </div>
                </Row>
                <Row>

                  <div className="text-center" style={{ paddingLeft: "30px", paddingTop: "10px" }}>
                    <IconContext.Provider
                      value={{ size: "15em", color: " #7dbcff" }}
                    >
                      <IoIosCamera />
                    </IconContext.Provider>
                  </div>
                </Row>
                <Row>

                  <Container
                    className="text subHeader"
                    style={{ fontSize: "42px", color: "#7dbcff" }}
                  >
                    {alb.name}

                  </Container>

                </Row>

              </button>
            </Col>

          </Row>

        </div>
      ))}
    </Col>
  );
};

export default ListAlbum;
