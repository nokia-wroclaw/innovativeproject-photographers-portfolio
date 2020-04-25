import React, {Component} from 'react';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import './Login.css';
import { Link } from 'react-router';
import Register from './Register';

class Login extends Component{
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
      <div>
      <h1  className="header" >Photographer's portfolio</h1>
        <Form className="login-form" onSubmit={this.handleSubmit}>
        <div className="box">
          <h1 className="signIn">Sign In</h1>
        <FormGroup style={{paddingBottom:'5%', paddingTop:'5%'}}>
          <Input value={this.state.email} onChange={(ev)=>this.setState({email:ev.target.value})} type="email" placeholder="Email"/>
        </FormGroup>
        <FormGroup style={{paddingBottom:'5%'}}>
          <Input value={this.state.password} onChange={(ev)=>this.setState({password:ev.target.value})} type="password" placeholder="Password"/>
        </FormGroup>
        <Button type="submit" className="btn-lg btn-dark btn-block">
          Sign in
        </Button>
        <div className="text-center">
          <Link to="/register" className="btn btn-dark" role="button">Sign Up</Link>
          <span className="p-2"></span>
          <a href="/forgot-password" className="btn btn-dark" role="button">Forgot Password</a>
        </div>
        <div className="text-center" style={{paddingTop:'5%', color:"white"}}>
        By clicking “Sign up”, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Statement</a>. 
        </div>
        </div>
      </Form>
      </div>
    );
  }
}

export default Login;