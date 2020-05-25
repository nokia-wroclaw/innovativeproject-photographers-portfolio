import React, {Component, useState} from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router';
import { Container ,Row, Button, Col} from 'reactstrap';
import Footer from '../Footer/Footer'
import Modal from './Modal'
import ListItems from './ListAlbum'
import '../MainPage.scss';
import {IoIosPower, IoIosAdd, IoIosImages, IoIosCube} from 'react-icons/io'
import { IconContext } from 'react-icons';
import Navi from '../Nav'


function MainPageAlbum(){
        return(
            <Container className="mainPageBkgd scroll" fluid style={{paddingLeft:'0', paddingRight:'0'}}>
                <Navi />
                <Row >
                <Col style={{maxWidth:'15%'}}>
                <Nav className="flex-column color-nav verticalThin" fixed="left">
                      <Nav.Link href="/mainPageAlbum" className="text verticalNav" >
                        <IoIosImages/>
                        <span className="p-2"></span>
                        My albums
                      </Nav.Link>
                      <Nav.Link href="/mainPagePage" className="text verticalNav" >
                        <IoIosCube/>
                        <span className="p-2"></span>
                        My pages
                      </Nav.Link>
                    </Nav>
                </Col>
                <Col>
                <Row className="text-center" >
                  <Container fluid style={{paddingTop:'150px',alignItems:'center', display:'flex'}}>
                    <Container className="text subHeader title" style={{paddingLeft:'40px'}}>My Albums</Container>
                  </Container>
                </Row>
                <Row className="text-center" style={{paddingTop:'5%'}} >
                  <Container className="add-element" fluid>
                  <h1 className="texth">Please enter Album Name:</h1>
                  <span className="p-2"></span>
                  <form id="to-do-form">
                    <input type="text" placeholder="Enter name"></input>
                    <span className="p-2"></span>
                    <button type="submit" className="buttonLightPink lightTheme">
                      <IconContext.Provider value={{size:'2em',color:'#ceb1ba'}}>
                        <IoIosAdd/>
                      </IconContext.Provider>
                    </button>
                  </form>
                  <p></p>
                  </Container>
                </Row>
                <Row style={{ paddingLeft:'15%', paddingTop:'5%'}}>
                  <Col>
                    
                  </Col>
                </Row>
                </Col>
                </Row>
                <Container fluid style={{position:'fixed', bottom:'0', paddingLeft:'0', paddingRight:'0'}}>
                  <Footer />
                </Container>
            </Container>

        );
}

export default MainPageAlbum;