import React, { Component, useContext, useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Container } from "reactstrap";
import "./Login.css";
import { Link } from "react-router";
import { useHistory } from "react-router-dom";
import ky from "ky";
import { SessionContext, getSessionCookie, setSessionCookie } from "../../contexts/Loggedcontext";
import * as Cookies from "js-cookie";

const Login = () => {
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  

  const submitHandler = async (setStatus) => {
    const formData = new FormData();
    formData.append("username", email_address);
    formData.append("password", password);
    setLoading(true);
    (async () => {
      try {
        await ky.post("/api/v1/login", { body: formData });
        setSessionCookie({ email_address });
        history.push("/mainPage");
        setLoading(false);
      } catch (e) {
        setStatus({ error: "loginError" });
      }
    })();
  }

  
  return (
    <Container className="bkgd" fluid>
      <h1 className="header">Photographer's portfolio</h1>
      <Form
        className="login-form"
        onSubmit={submitHandler}
      >
        <div className="box">
          <h1 className="signIn">Sign In</h1>
          <FormGroup style={{ paddingBottom: "5%", paddingTop: "5%" }}>
            <Input
              id="email_address"
              name="email_address"
              type="email"
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup style={{ paddingBottom: "5%" }}>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </FormGroup>
          <Button className="btn-lg btn-dark btn-block" type="submit">
            Sign In
          </Button>
          <div className="text-center" style={{ paddingTop: "8%" }}>
            <Button className="btn btn-dark" role="button">
              <Link
                href="/register"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign Up
              </Link>
            </Button>
            <span className="p-2"></span>
            <a href="/forgot-password" className="btn btn-dark" role="button">
              Forgot Password
            </a>
          </div>
          <div
            className="text-center"
            style={{ paddingTop: "5%", color: "white" }}
          >
            By clicking “Sign up”, you agree to our{" "}
            <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Statement</a>.
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
