import React from 'react';
import './App.css';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { FacebookLoginButton} from 'react-social-login-buttons';
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <h1  class="header" >Photographer's portfolio</h1>
      <Form className="login-form">
        <div class="box">
          <h1 class="signIn">Sign In</h1>
        <FormGroup style={{paddingBottom:'5%', paddingTop:'5%'}}>
          <Input type="email" placeholder="Email"/>
        </FormGroup>
        <FormGroup style={{paddingBottom:'5%'}}>
          <Input type="password" placeholder="Password"/>
        </FormGroup>
        <Button className="btn-lg btn-dark btn-block">
          Log in
        </Button>
        <div className="text-center pt-3" style={{color:'white'}}>
          Or continue with your social account
        </div>
        <FacebookLoginButton className="mt-3 mb-3"/>
        <div className="text-center">
          <a href="/sign up" class="btn btn-dark" role="button">Sign Up</a>
          <span className="p-2"></span>
          <a href="/forgot-password" class="btn btn-dark" role="button">Forgot Password</a>
        </div>
        </div>
      </Form>
      <Footer />
    </div>

  );
}


export default App;
