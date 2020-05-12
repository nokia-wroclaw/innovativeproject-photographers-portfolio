import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";
import './Register.scss';
import ky from 'ky';


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email_address: "",
      first_name: "",
      last_name: "",
      nickname: "",
      additional_email: "",
      password: "",
      repassword: ""
    };
    this.submitHandler = this.submitHandler.bind(this)
  }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

   async submitHandler (e) {
      //  try{
           e.preventDefault();
          //  var formData = {
          //   email_adress: this.state.email_address,
          //   first_name: this.state.first_name,
          //   last_name: this.state.last_name,
          //   nickname: this.state.nickname,
          //   additional_email: this.state.additional_email,
          //   password: this.state.password,
          //   repassword: this.state.repassword
          //  }
          //  return await ky.post("/api/register", {json: {body: formData}}).json();
          return await ky.post("/api/v1/register", {json: {

            email_address: this.state.email_address,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            nickname: this.state.nickname,
            additional_email:this.state.additional_email,
            password:this.state.password,
            repassword: this.state.repassword
          }}).json()

    }

  render() {
    const {email_address, first_name, last_name, nickname, additional_email, password, repassword} = this.state
    return (
    <Container className="bkgd" fluid>
      <h1 className="header">Photographer's portfolio</h1>
      <Form className="register-form" onSubmit={this.submitHandler}>
        <Container className="box vertical-divider">
          <Row>
            <Col>
              <h1 className="signIn">Sign Up</h1>
              <FormGroup style={{ paddingBottom: '5%', paddingTop: '5%' }}>
                <Input
                id="first_name"
                name="first_name"
                type="text"
                value={first_name}
                onChange={this.changeHandler}
                placeholder="Name" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="last_name"
                name="last_name"
                type="text"
                value={last_name}
                onChange={this.changeHandler}
                placeholder="Last Name" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="email_address"
                name="email_address"
                type="email"
                value={email_address}
                onChange={this.changeHandler}
                placeholder="Email"/>
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="nickname"
                name="nickname"
                type="text"
                value={nickname}
                onChange={this.changeHandler}
                placeholder="Nickname" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="additional_email"
                name="additional_email"
                type="text"
                value={additional_email}
                onChange={this.changeHandler}
                placeholder="Additional Email" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.changeHandler}
                placeholder="Password" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
              <Input
                id="repassword"
                name="repassword"
                type="password"
                value={repassword}
                onChange={this.changeHandler}
                placeholder="Confirm Password" />
              </FormGroup>
              <Button className="btn-lg btn-dark btn-block" type="submit">Sign Up</Button>
              <div className="text-center" style={{ paddingTop: '5%', color: "white" }}>
                By clicking “Sign up”, you agree to our
                <a href="#">Terms of Service</a> and <a href="#">Privacy Statement</a>.
              </div>
            </Col>
            <div className="split-layout__divider">
              <div className="split-layout__rule"></div>
              <div className="split-layout__label">Or</div>
              <div className="split-layout__rule"></div>
            </div>

            <Col style={{ paddingTop: '20%' }}>
              <h1 className="signIn">Sign In</h1>
              <FormGroup style={{ paddingBottom: '5%', paddingTop: '5%' }}>
                <Input value={this.state.email} onChange={(ev) => this.setState({ email: ev.target.value })} type="email" placeholder="Email" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input value={this.state.password_log} onChange={(ev) => this.setState({ password_log: ev.target.value })} type="password" placeholder="Password" />
              </FormGroup>
              <Button type="submit" className="btn-lg btn-dark btn-block" style={{ textDecoration: 'none' }}>
                <Link href="/mainPage" style={{ textDecoration: 'none', color: 'white' }}> Sign in </Link>
              </Button>

            </Col>
          </Row>

        </Container>
      </Form>
    </Container>);
  }
}
export default Register;