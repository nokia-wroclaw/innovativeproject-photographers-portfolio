import React, {Component} from 'react';
import './Editor.scss';
import { Form, Container, Row, Col} from 'reactstrap';
import ky from 'ky';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditorRender from "./EditorRender"
import {IoIosPower, IoIosSettings, IoIosColorPalette} from 'react-icons/io'
import { IconContext } from 'react-icons';
import Navi from '../Nav'

function Editor(){
    return(
          <Container className="mainPageBkgd" fluid style={{paddingLeft:'0', paddingRight:'0'}}>
          <Navi />

          <Row style={{paddingTop:'8%'}}>
            <Col style={{paddingLeft:'2%'}}>
            <Form className="editor-form" >
             <Row style={{paddingLeft:'2%'}}>
            <button type="submit" style={{backgroundColor:'black', borderWidth:'0'}}>
              <IconContext.Provider value={{size:'4em',color:'#ceb1ba'}}>
                <IoIosSettings/>
              </IconContext.Provider>
            </button>
            <span className="p-2"></span>
            <p className="text" style={{fontSize:'30px',paddingTop:'2%'}}>Jinja Code</p>
            </Row>
            <Row style={{paddingLeft:'5%', paddingTop:'1%'}}>
           <textarea
              name="userInput"
             
            /></Row>
           </Form>
            </Col>


            <Col style={{paddingRight:'2%'}}>
            <Form className="editor-form ">
            <Row style={{paddingLeft:'2%'}}>
            <IconContext.Provider value={{size:'4em',color:'#ceb1ba'}}>
              <IoIosColorPalette/>
            </IconContext.Provider>
            <span className="p-2"></span>
            <p className="text" style={{fontSize:'30px',paddingTop:'2%'}}>Your Page</p>
            </Row>
            <Row style={{paddingLeft:'5%', paddingTop:'1%',paddingRight:'5%'}}>
              <Container className="render">
            
            </Container>
            </Row>
           </Form>
            </Col>
          </Row>

        </Container>
      );
}
export default Editor;