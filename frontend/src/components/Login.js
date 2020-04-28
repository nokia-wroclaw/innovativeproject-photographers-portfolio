import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Container} from 'reactstrap';
import './Login.css';
import { Link } from 'react-router';
import Register from './Register';

class Login extends Component{
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
}

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('/login', {
        method: 'POST',
        body: data,
    });
  }

  render(){

    return(
      <Container className="bkgd" fluid>
        <title> Login </title>
      <h1  className="header" >Photographer's portfolio</h1>

        <Form className="login-form" onSubmit={this.handleSubmit}>
        <div className="box">
          <h1 className="signIn">Sign In</h1>
        <FormGroup style={{paddingBottom:'5%', paddingTop:'5%'}}>
          <Input id="user" name="user" type="user" placeholder="Email"/>
        </FormGroup>
        <FormGroup style={{paddingBottom:'5%'}}>
          <Input id="password" name="password" type="password" placeholder="Password"/>
        </FormGroup>
        <Link to="/mainPage" type="submit" className="btn-lg btn-dark btn-block text-center" renderAs={Button} style={{textDecoration: 'none'}}>
          Sign in
        </Link>
        <div className="text-center" style={{paddingTop:'8%'}}>
          <Link to="/register" className="btn btn-dark" role="button">Sign Up</Link>
          <span className="p-2"></span>
          <a href="/forgot-password" className="btn btn-dark" role="button">Forgot Password</a>
        </div>
        <div className="text-center" style={{paddingTop:'5%', color:"white"}}>
        By clicking “Sign up”, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Statement</a>.
        </div>
        </div>
      </Form>

      </Container>
    );
  }
}

export default Login;