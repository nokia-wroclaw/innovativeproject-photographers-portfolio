import React, { Component, useContext, useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Container } from "reactstrap";
import "./Login.css";
import { Link } from "react-router";
import { useHistory } from "react-router-dom";
import ky from "ky";
import LoggedContext from "../../contexts/Loggedcontext";
import * as Cookies from "js-cookie";
import * as yup from "yup";

const validationSchema = yup.object({
  email_address: yup.string().required(),
  password: yup.string().required()
});

const Login = () => {
  const [email_address, setEmailAddress] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const history = useHistory();
  const isLogged = useContext(LoggedContext);

  useEffect(() => {
    if (isLogged) {
      history.replace("/mainPage");
    }
  }, [isLogged, history]);

  async function submitHandler(setStatus) {
    const formData = new FormData();
    formData.append("username", email_address);
    formData.append("password", password);
    (async () => {
      try {
        await ky.post("/api/v1/login", { body: formData });
        Cookies.set("username", email_address, {expires:7});
        history.push("/mainPage");
      } catch (e) {
        setStatus({ error: "loginError" });
      }
    })();
  }

  const onSubmit = (setSubmitting,setStatus) => {
    setSubmitting(true);
    submitHandler(setStatus);
    setSubmitting(false);
  };
  return (
    <Container className="bkgd" fluid>
      <h1 className="header">Photographer's portfolio</h1>
      <Form
        className="login-form"
        onSubmit={({ setSubmitting, setStatus }) => {
          onSubmit(setSubmitting, setStatus);
        }}
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
          <Button className="btn-lg btn-dark btn-block" type="submit" disabled={isSubmitting}>
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
