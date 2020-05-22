import React from "react";
import { IoIosTrash, IoIosCamera } from "react-icons/io";
import { IconContext } from "react-icons";
import FlipMove from "react-flip-move";
import { Container, Col, Row } from "reactstrap";

function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <div className="list" key={item.key}>
        <Row>
          <Col style={{ maxWidth: "330px" }}>
            <button
              className="buttonLightPink darkTheme"
              style={{ height: "300px", width: "300px" }}
            >
              <IconContext.Provider value={{ size: "15em", color: "#ceb1ba" }}>
                <IoIosCamera />
              </IconContext.Provider>
            </button>
            {/*<input type="text" id={item.key} value={item.text} onChange={(e)=>{
             props.setUpdate(e.target.value,item.key)}}/>*/}
          </Col>
          <Col style={{ maxWidth: "55%" }}>
            <Container className="borderBox" fluid>
              <Container
                className="text subHeader subTitle"
                style={{ fontSize: "40px" }}
              >
                Description:
                <div className="float-right" style={{ bottom: 0 }}>
                  <button
                    onClick={() => {
                      props.deleteItem(item.key);
                    }}
                    style={{ borderWidth: "0", backgroundColor: "#333333" }}
                  >
                    <IconContext.Provider
                      value={{ size: "1em", color: "#ceb1ba" }}
                    >
                      <IoIosTrash />
                    </IconContext.Provider>
                  </button>
                </div>
              </Container>
              <br />
              <p className="text" style={{ fontSize: "20px" }}>
                Name: {item.text}
              </p>
            </Container>
          </Col>
        </Row>
      </div>
    );
  });
  return (
    <div>
      <FlipMove duration={300} easing="ease-in-out">
        {listItems}
      </FlipMove>
    </div>
  );
}

export default ListItems;
