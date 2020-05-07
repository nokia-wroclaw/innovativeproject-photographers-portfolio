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
<<<<<<< HEAD
       description: ""
=======
        userInput: "",
        output: "",
        flag: "start value"
>>>>>>> 48260aac066f0bce2495fc7794b4e6dc6e983ee0
        }
        this.submitHandler = this.submitHandler.bind(this)
      }

        changeHandler = (e) => {
            this.setState({[e.target.name]: e.target.value})
        }

        async submitHandler (e) {
            //  try{
                 e.preventDefault();
<<<<<<< HEAD
                 var formData = {
                  description: this.state.description,
                 }
                 return await ky.post("http://127.0.0.1:8000/input", {body: formData});
=======
                 const formData = new FormData();
                 formData.append('userInput', this.state.userInput);
                 this.state.flag = "changed";
                 return await ky.post("/api/v1/editor", {body: formData});
>>>>>>> 48260aac066f0bce2495fc7794b4e6dc6e983ee0
            //  }
            // catch (e) {
            //    console.log("Register error");
            // }
<<<<<<< HEAD
=======
          }

        async componentDidUpdate(){
            let data;
            await ky.get("/api/v1/editor", data);
            if (this.state.flag !== "start value") {
                this.setState({output: data});
              }
>>>>>>> 48260aac066f0bce2495fc7794b4e6dc6e983ee0
          }
          state = {
            userInput:
              "<h1>Live Text Editor!</h1><br/><p>Click 'Run' to display the results</p>",
            showHTML: false,
            updateInput: ""
          };

          userType = e => {
            this.setState({ [e.target.name]: e.target.value, showHTML: false });
          };

          createWindow = () => {
            return {
              __html: `<html>${
                this.state.showHTML ? this.state.userInput : this.state.updateInput
              }</html>`
            };
          };
          showHTML = () => {
            this.setState({
              showHTML: !this.state.showHTML,
              updateInput: this.state.userInput
            });
          };
render(){
<<<<<<< HEAD

=======
    const {userInput, output} = this.state
>>>>>>> 48260aac066f0bce2495fc7794b4e6dc6e983ee0
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
                <Nav.Link href="#deets" >
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
<<<<<<< HEAD
              value={this.state.userInput}
              onChange={e => this.userType(e)}
=======
              value={userInput}
              onChange={this.changeHandler}
>>>>>>> 48260aac066f0bce2495fc7794b4e6dc6e983ee0
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
<<<<<<< HEAD
            <div dangerouslySetInnerHTML={this.createWindow()}/></Container></Row>
=======
                <div> {output ? <div>update...</div> : <div> not update</div>}</div>
            </Container></Row>
>>>>>>> 48260aac066f0bce2495fc7794b4e6dc6e983ee0
           </Form>
            </Col>
          </Row>

        </Container>
      );
  }
}
export default Editor;