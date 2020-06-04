import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Container } from "reactstrap";
import "./Login.css";
import { Link } from "react-router";
import ky from "ky";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_address: "",
      password: "",
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async submitHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", this.state.email_address);
    formData.append("password", this.state.password);
    return await ky.post("/api/v1/login", { body: formData });
  }
  render() {
    const { email_address, password } = this.state;
    return (
      <Container className="bkgd" fluid>
        <h1 className="header">Photographer's portfolio</h1>
        <Form className="login-form" onSubmit={this.submitHandler}>
          <div className="box">
            <h1 className="signIn">Sign In</h1>
            <FormGroup style={{ paddingBottom: "5%", paddingTop: "5%" }}>
              <Input
                id="email_address"
                name="email_address"
                type="email"
                value={email_address}
                onChange={this.changeHandler}
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup style={{ paddingBottom: "5%" }}>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.changeHandler}
                placeholder="Password"
              />
            </FormGroup>
            <Button className="btn-lg btn-dark btn-block" type="submit">
              Sign In
            </Button>
            <div className="text-center" style={{ paddingTop: "8%" }}>
              <a role="button">
                <Link
                  href="/register"
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  Sign Up
                </Link>
              </a>
              <span className="p-2"></span>
              <a href="/forgot-password" role="button">
                Forgot Password
              </a>
            </div>

          </div>
        </Form>
      </Container>
    );
  }
}

export default Login;
