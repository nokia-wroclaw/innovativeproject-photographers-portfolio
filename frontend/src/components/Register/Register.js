import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";
import './Register.scss';
import ky from 'ky';


class Register extends Component {


  render() {
   
    return (
    <Container className="bkgd" fluid>
      <h1 className="header">Photographer's portfolio</h1>
      <Form className="register-form">
        <Container className="box vertical-divider">
          <Row>
            <Col>
              <h1 className="signIn">Sign Up</h1>
              <FormGroup style={{ paddingBottom: '5%', paddingTop: '5%' }}>
                <Input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Name" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Last Name" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="email_address"
                name="email_address"
                type="email"
                placeholder="Email"/>
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="Nickname" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="additional_email"
                name="additional_email"
                type="text"
                placeholder="Additional Email" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
              <Input
                id="repassword"
                name="repassword"
                type="password"
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
                <Input  type="email" placeholder="Email" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input type="password" placeholder="Password" />
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