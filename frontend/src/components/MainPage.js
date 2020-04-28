import React, {Component} from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router';
import { Container } from 'reactstrap';
import './MainPage.scss';
import {TiPower} from 'react-icons/ti'
import { IconContext } from 'react-icons';

class MainPage extends Component{
    render(){
        return(    
            <Container className="mainPageBkgd" fluid style={{paddingLeft:'0', paddingRight:'0'}}>      
                <Navbar collapseOnSelect expand="xl" className="color-nav" variant="dark" fixed="">
                  <Navbar.Brand href="#home" className="text" style={{color:'#FFCB9A'}}>Alusia Pimpusia</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                      <Nav.Link href="#deets" className="text" style={{color:'#FFCB9A'}}>Photos</Nav.Link>
                      <Nav.Link href="#deets" className="text" style={{color:'#FFCB9A'}}>Edit Page</Nav.Link>
                      <Nav.Link href="#deets" className="text" style={{color:'#FFCB9A'}}>Messages</Nav.Link>
                      <Nav.Link href="#deets" className="text" style={{color:'#FFCB9A'}}>Settings</Nav.Link>
                      <Nav.Link href="#deets" >
                        <IconContext.Provider value={{size:'2em'}}>
                          <TiPower/>
                          </IconContext.Provider>
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>            
                <Container fluid style={{paddingTop:'60px', paddingLeft:'50px', paddingRight:'50px'}}>
                  <Container className="text subHeader red" style={{maxWidth:'350px', paddingLeft:'25px'}}>My albums</Container>
                  
                </Container>
            </Container> 
            
        );
    }
}

export default MainPage;