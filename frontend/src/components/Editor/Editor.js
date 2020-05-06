import React, {Component} from 'react';
import './Editor.scss';
import { Button, Form, Input, Container, Row, Col} from 'reactstrap';
import ky from 'ky';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {IoIosPower, IoIosSettings, IoIosColorPalette} from 'react-icons/io'
import { IconContext } from 'react-icons';

class Editor extends Component{
    constructor(props){
        super(props)
       this.state={
        userInput: "",
        output: "",
        flag: "start value"
        }
        this.submitHandler = this.submitHandler.bind(this)
      }

        changeHandler = (e) => {
            this.setState({[e.target.name]: e.target.value})
        }

        async submitHandler (e) {
                 e.preventDefault();
                 var formData = {
                    userInput: this.state.userInput,
                 }
                 this.state.flag = "changed";
                 return await ky.post("/editor", {body: formData});
            //  }
            // catch (e) {
            //    console.log("Register error");
            // }
          }

        async componentDidUpdate(){
            let data;
            await ky.get("/editor", data);
            if (this.state.flag !== "start value") {
                this.setState({output: data});
              }
          }

render(){
    const {userInput, output} = this.state
    return(
          <Container className="mainPageBkgd" fluid style={{paddingLeft:'0', paddingRight:'0'}}>
          <Navbar collapseOnSelect expand="xl" className="color-nav" variant="dark" fixed="">
            <Navbar.Brand>
              <Link to="/mainPage" className="text nav" style={{textDecoration:'none', color:'#077cc5'}}>
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

          <Row style={{paddingTop:'3%'}}>
            <Col style={{paddingLeft:'2%'}}>
            <Form className="editor-form" onSubmit={this.submitHandler}>
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
              value={userInput}
              onChange={this.changeHandler}
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
                <div> {output ? <div>update...</div> : <div> not update</div>}</div>
            </Container></Row>
           </Form>
            </Col>
          </Row>

        </Container>
      );
  }
}
export default Editor;