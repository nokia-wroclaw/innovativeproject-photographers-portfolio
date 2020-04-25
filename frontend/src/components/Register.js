import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap';
import { Link } from 'react-router';
import './Register.scss';
import {FaSignInAlt} from 'react-icons/fa'
import { IconContext } from 'react-icons';

class Register extends Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={
      email: "",
      password: ""
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch('/', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
       "email": this.state.email,
       "password": this.state.password
      })
    })
    .then(response => response.json())
    .then(data => this.setState({postId:data.id}));
  }
  render(){
      return(
      <Container>
        <h1  className="header" >Photographer's portfolio</h1> 
        <Form className="register-form">
          <Container className="box vertical-divider" >
            <Row >
              <Col >
                <h1 class="signIn">Sign Up</h1>
                <FormGroup style={{paddingBottom:'5%', paddingTop:'5%'}}>
                  <Input type="text" placeholder="Name"/>
                </FormGroup>
                <FormGroup style={{paddingBottom:'5%'}}>
                  <Input type="text" placeholder="Last Name"/>
                </FormGroup>
                <FormGroup style={{paddingBottom:'5%'}}>
                  <Input type="email" placeholder="Email"/>
                </FormGroup>
                <FormGroup style={{paddingBottom:'5%'}}>
                  <Input type="password" placeholder="Password"/>
                </FormGroup>
                <FormGroup style={{paddingBottom:'5%'}}>
                  <Input type="password" placeholder="Confirm Password"/>
                </FormGroup>
                <FormGroup style={{paddingBottom:'5%'}}>
                  <Input type="text" placeholder="Nickname"/>
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block">Sign Up</Button>
                <div className="text-center" style={{paddingTop:'5%', color:"white"}}>
                  By clicking “Sign up”, you agree to our 
                    <a href="#">Terms of Service</a> and <a href="#">Privacy Statement</a>. 
                </div>
              </Col>
              <div class="split-layout__divider">
                <div class="split-layout__rule"></div>
                  <div class="split-layout__label">Or</div>
                <div class="split-layout__rule"></div>
              </div>
              {/*<Col style={{paddingTop:'36%'}}>
              <div className="text-center">
              
              <IconContext.Provider value={{ color: "white", size:'2em' }}>                
                  <FaSignInAlt />               
              </IconContext.Provider>
              <span className="p-2"></span>
              <Link to="/login" className="btn-lg btn-dark" role="button">Sign In</Link>
              </div>
              </Col>*/}
              <Col style={{paddingTop:'20%'}}>
              <h1 className="signIn">Sign In</h1>
              <FormGroup style={{paddingBottom:'5%', paddingTop:'5%'}}>
                <Input value={this.state.email} onChange={(ev)=>this.setState({email:ev.target.value})} type="email" placeholder="Email"/>
              </FormGroup>
              <FormGroup style={{paddingBottom:'5%'}}>
                <Input value={this.state.password} onChange={(ev)=>this.setState({password:ev.target.value})} type="password" placeholder="Password"/>
              </FormGroup>
              <Button type="submit" className="btn-lg btn-dark btn-block">Sign in</Button>
        {/*
        <div className="text-center">
          <Container style={{paddingTop: '9%'}}>
            <a href="/forgot-password" className="btn btn-dark" role="button">Forgot Password</a>
          </Container>          
        </div>*/}
              </Col>
            </Row>
        
          </Container>     
        </Form>
      </Container>
    );
  }
}

export default Register;