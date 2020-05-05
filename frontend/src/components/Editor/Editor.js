import React, {Component} from 'react';
import './Editor.css';
import { Button, Form, Input, Container, Row, Col} from 'reactstrap';
import ky from 'ky';

class Editor extends Component{
    constructor(props){
        super(props)
       this.state={
       description: ""
        }
        this.submitHandler = this.submitHandler.bind(this)
      }

        changeHandler = (e) => {
            this.setState({[e.target.name]: e.target.value})
        }

        async submitHandler (e) {
            //  try{
                 e.preventDefault();
                 var formData = {
                  description: this.state.description,
                 }
                 return await ky.post("http://127.0.0.1:8000/input", {body: formData});
            //  }
            // catch (e) {
            //    console.log("Register error");
            // }
          }

redner(){
      const {textinput} = this.state
    return(
      <Container className="bkgd" fluid>
      <h1 className="header">Photographer's portfolio</h1>
      <Form className="register-form" onSubmit={this.submitHandler}>
        <Container className="box vertical-divider">
          <Row>
            <Col>
            <Form className="text-description" onSubmit={this.submitHandler}>
            <h1 className="output">Jinja Code</h1>
           <button type="submit" >Compile</button>
           <Input
           className = "text-input"
           id="textinput"
           type="text"
           value={textinput}
           onChange={this.changeHandler}
           />
           </Form>
            </Col>
            <div className="split-layout__divider">
              <div className="split-layout__rule"></div>
              <div className="split-layout__label"></div>
              <div className="split-layout__rule"></div>
            </div>

            <Col style={{ paddingTop: '100%' }}>
              <h1 className="header">Your Page</h1>
            <Button type="submit">Save</Button>
            </Col>
          </Row>

        </Container>
      </Form>
    </Container>);
  }
}
export default Editor;
