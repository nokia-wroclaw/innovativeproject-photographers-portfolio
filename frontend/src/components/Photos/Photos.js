import React, {Component} from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Container ,Row,  Col} from 'reactstrap';

class Photos extends Component{
    render(){
      return(
        <Container className="mainPageBkgd" fluid style={{paddingLeft:'0', paddingRight:'0'}}>
            <Navbar collapseOnSelect expand="xl" className="color-nav" variant="dark" fixed="top">
              <Navbar.Brand>
                <Link href="/mainPage" className="text nav" style={{textDecoration:'none', color:'#077cc5'}}>
                  Jan Kowalski
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>
                  <Nav.Link href="#deets" className="text" style={{color:'#077cc5'}}>Photos</Nav.Link>
                  <Nav.Link href="/editor" className="text" style={{color:'#077cc5'}}>Edit Page</Nav.Link>
                  <Nav.Link href="#deets" className="text" style={{color:'#077cc5'}}>Messages</Nav.Link>
                  <Nav.Link href="#deets" className="text" style={{color:'#077cc5'}}>Settings</Nav.Link>
                  <Nav.Link href="/login" >
                    <IconContext.Provider value={{size:'2em', color:'#077cc5'}}>
                      <IoIosPower/>
                    </IconContext.Provider>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        </Container>
        );
    }
}