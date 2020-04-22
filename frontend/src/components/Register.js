import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './Register.css';

class Register extends Component{
    render(){
        return(
        <Form className="register-form">
        <div class="box">
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
        <Button className="btn-lg btn-dark btn-block">
          Sign Up
        </Button>
        <div className="text-center" style={{paddingTop:'5%', color:"white"}}>
        By clicking “Sign up”, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Statement</a>. 
        </div>
        </div>
      </Form>

        );
    }
}

export default Register;