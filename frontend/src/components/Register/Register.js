import React, {Component} from 'react';
import Cookies from "js-cookie";
import { Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import './Register.scss';
import ky from 'ky';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_address: "",
      first_name: "",
      last_name: "",
      nickname: "",
      additional_email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    (async () => {
      try {
        await ky.post("/register", {
        json: {
          email_address: this.state.email_address,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          nickname: this.state.nickname,
          additional_email: this.state.additional_email,
          password: this.state.password
        }
        });
        // Cookies.set("email", this.state.email_address, { expires: 7 });
        // history.push("/menu");
      }
      catch (e) {
        // setStatus({ error: "registerError" });
      }
    })();
  };
  render() {
    return (<Container className="bkgd" fluid>
      <h1 className="header">Photographer's portfolio</h1>
      <Form className="register-form" onSubmit={this.handleSubmit}>
        <Container className="box vertical-divider">
          <Row>
            <Col>
              <h1 className="signIn">Sign Up</h1>
              <FormGroup style={{ paddingBottom: '5%', paddingTop: '5%' }}>
                <Input id="first_name" name="first_name" type="text" value={this.state.first_name} onChange={(ev) => this.setState({ first_name: ev.target.value })} placeholder="Name" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input id="last_name" name="last_name" type="text" value={this.state.last_name} onChange={(ev) => this.setState({ last_name: ev.target.value })} placeholder="Last Name" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input type="email" placeholder="Email" id="email_address" name="email_address" value={this.state.email_address} onChange={(ev) => this.setState({ email_address: ev.target.value })} />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input id="password" name="password" type="password" value={this.state.password} onChange={(ev) => this.setState({ password: ev.target.value })} placeholder="Password" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input type="password" placeholder="Confirm Password" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input id="nickname" name="nickname" type="text" value={this.state.nickname} onChange={(ev) => this.setState({ nickname: ev.target.value })} placeholder="Nickname" />
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
              <Button to="/mainPage" type="submit" className="btn-lg btn-dark btn-block" style={{ textDecoration: 'none' }}>
                <Link style={{ textDecoration: 'none', color: 'white' }}> Sign in </Link>
              </Button>

            </Col>
          </Row>

        </Container>
      </Form>
    </Container>);
  }
}

export default Register;