import React, { useEffect, useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router";
import { IoIosPower } from "react-icons/io";
import { IconContext } from "react-icons";
import LoggedContext from "../contexts/Loggedcontext";
import { useHistory } from "react-router-dom";
import ky from "ky";

const Navi = () => {
  const history = useHistory();
  const isLogged = useContext(LoggedContext);

  /*useEffect(() => {
    if (!isLogged) {
      history.replace("/login");
    }
  }, [isLogged, history]);*/

  /*const logout = async () => {
    try {
      await ky.get("/api/v1/logout");
      history.push("/login");
    } catch (e) {
      console.log("logout error");
    }
  };*/
  return (
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
          <Nav.Link href="/photos" className="text" style={{ color: "whitesmoke" }}>
            Photos
          </Nav.Link>
          <Nav.Link
            href="/editor"
            className="text"
            style={{ color: "whitesmoke" }}
          >
            Edit Page
          </Nav.Link>
          {/* <Nav.Link href="/messages" className="text" style={{ color: "#077cc5" }}>
            Messages
  </Nav.Link>*/}
          {/* <Nav.Link href="#deets" className="text" style={{ color: "#077cc5" }}>
            Settings
</Nav.Link>*/}
          <Nav.Link /*onClick={() => {logout();}}*/>
            <IconContext.Provider value={{ size: "2em", color: "#7dbcff" }}>
              <IoIosPower />
            </IconContext.Provider>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navi;
