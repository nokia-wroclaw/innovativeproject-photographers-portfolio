import React, {Component,  useState, useEffect, useContext} from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";
import './Register.scss';
import ky from 'ky';
import Cookies from "js-cookie";
import LoggedContext from "../../contexts/Loggedcontext";
import {useHistory} from 'react-router-dom';

const Register = () => {
  const[email_address, setEmailAddress] = useState("");
  const[first_name, setFirstName] = useState("");
  const[last_name, setLastName] = useState("");
  const[nickname, setNickname] = useState("");
  const[additional_email, setAdditionalEmail] = useState("");
  const[password, setPassword] = useState("");
  const[repassword, setRepassword] = useState("");
  const history = useHistory();
  const isLogged = useContext(LoggedContext);
   
  useEffect(() => {
    if (isLogged) {
      history.replace("/menu");
    }
  }, [isLogged, history]);

  async function submitHandler (setStatus) {
    const formData = new FormData()
    formData.append("username", email_address);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("nickname", nickname);
    formData.append("additional_email", additional_email);
    formData.append("password", password);
    formData.append("repassword", repassword);
    (async () => {
        try{
            await ky.post("/api/v1/register", {
              json: {
                email_address: email_address,
                first_name: first_name,
                last_name: last_name,
                nickname: nickname,
                additional_email: additional_email,
                password: password,
                repassword: repassword,
              },
            })
            .json();
        Cookies.set("username", email_address);
        history.push("/mainPage")
        }catch (e){
            setStatus({error: "registerError"});
        }
    })();
}
const onSubmit = (setStatus) => {
  submitHandler(setStatus);
}
    return (
    <Container className="bkgd" fluid>
      <h1 className="header">Photographer's portfolio</h1>
      <Form className="register-form" onSubmit={({setStatus}) => {onSubmit(setStatus);}}>
        <Container className="box vertical-divider">
          <Row>
            <Col>
              <h1 className="signIn">Sign Up</h1>
              <FormGroup style={{ paddingBottom: '5%', paddingTop: '5%' }}>
                <Input
                id="first_name"
                name="first_name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Name" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="last_name"
                name="last_name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="email_address"
                name="email_address"
                type="email"
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Email"/>
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="nickname"
                name="nickname"
                type="text"
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nickname" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="additional_email"
                name="additional_email"
                type="text"
                onChange={(e) => setAdditionalEmail(e.target.value)}
                placeholder="Additional Email" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
              <Input
                id="repassword"
                name="repassword"
                type="password"
                onChange={(e) => setRepassword(e.target.value)}
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
              <Form>
              <FormGroup style={{ paddingBottom: '5%', paddingTop: '5%' }}>
                <Input  type="email" placeholder="Email" />
              </FormGroup>
              <FormGroup style={{ paddingBottom: '5%' }}>
                <Input type="password" placeholder="Password" />
              </FormGroup>
              <Button type="submit" className="btn-lg btn-dark btn-block" style={{ textDecoration: 'none' }}>
                <Link href="/mainPage" style={{ textDecoration: 'none', color: 'white' }}> Sign in </Link>
              </Button>
            </Form>
            </Col>
          </Row>

        </Container>
      </Form>
    </Container>);
  
}
export default Register;