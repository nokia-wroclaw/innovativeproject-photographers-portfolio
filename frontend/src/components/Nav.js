import React, {useEffect,useState, useContext} from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router";
import { IoIosPower } from "react-icons/io";
import { IconContext } from "react-icons";
import { SessionContext, getSessionCookie, setSessionCookie } from "../contexts/Loggedcontext";
import { useHistory } from "react-router-dom";
import ky from "ky";
import * as Cookies from "js-cookie";

const Navi = () => {
  const [email_address, setEmailAddress] = useState("");
  const history = useHistory();
  const session = useContext(SessionContext);

  useEffect(() => {
      Cookies.remove("session");
      history.push("/login");
  }, [ history]);

  if (session.email_address === undefined) {
    history.push("/login");
  }
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
          style={{ textDecoration: "none", color: "#077cc5" }}
        >
          Jan Kowalski
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="#deets" className="text" style={{ color: "#077cc5" }}>
            Photos
          </Nav.Link>
          <Nav.Link
            href="/editor"
            className="text"
            style={{ color: "#077cc5" }}
          >
            Edit Page
          </Nav.Link>
          <Nav.Link href="#deets" className="text" style={{ color: "#077cc5" }}>
            Messages
          </Nav.Link>
          <Nav.Link href="#deets" className="text" style={{ color: "#077cc5" }}>
            Settings
          </Nav.Link>
          <Nav.Link to="/login">
            <IconContext.Provider value={{ size: "2em", color: "#077cc5" }}>
              <IoIosPower />
            </IconContext.Provider>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navi;
