import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap';
import { Link } from 'react-router';
import './Register.scss';
import {FaSignInAlt} from 'react-icons/fa'
import { IconContext } from 'react-icons';

class Register extends Component{
  constructor(props) {
    super(props);

    this.state = {email_address: ''};
    this.state = {first_name: ''};
    this.state = {last_name: ''};
    this.state = {nickname: ''};
    this.state = {additional_email: ''};
    this.state = {password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

  handleChange(event){

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('/user', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_address: this.state.email_address,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            nickname: this.state.nickname,
            additional_email : this.state.additional_email,
            password: this.state.password,

        }),
    });
}
  render(){
      return(
      <Container className="bkgd" fluid>
        <h1  className="header" >Photographer's portfolio</h1>
        <Form className="register-form">
          <Container className="box vertical-divider" >
            <Row >
              <Col >
                <h1 class="signIn">Sign Up</h1>
                <FormGroup style={{paddingBottom:'5%', paddingTop:'5%'}}>
                  <Input id="first_name" name="first_name" type="text" value={this.state.first_name}  onChange = {this.handleChange} placeholder="Name"/>
                </FormGroup>
                <FormGroup style={{paddingBottom:'5%'}}>
                  <Input id="last_name" name="last_name" type="text" value={this.state.last_name}  onChange = {this.handleChange} placeholder="Last Name"/>
                </FormGroup>
                <FormGroup style={{paddingBottom:'5%'}}>
                  <Input type="email" placeholder="Email" id="email_address" name="email_address" value={this.state.email_address} onChange = {this.handleChange}/>
                </FormGroup>
                <FormGroup style={{paddingBottom:'5%'}}>
                  <Input id="password" name="password" type="password" value={this.state.password}  onChange = {this.handleChange} placeholder="Password"/>
                </FormGroup>
                <FormGroup style={{paddingBottom:'5%'}}>
                  <Input type="text" placeholder="Confirm Password"/>
                </FormGroup>
                <FormGroup style={{paddingBottom:'5%'}}>
                  <Input id="nickname" name="nickname" type="text" value={this.state.nickname}  onChange = {this.handleChange} placeholder="Nickname"/>
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
              <Link to="/mainPage" type="submit" className="btn-lg btn-dark btn-block" renderAs={Button} style={{textDecoration: 'none'}}>
                Sign in
              </Link>
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