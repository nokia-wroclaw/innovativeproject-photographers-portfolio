import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Container} from 'reactstrap';
import './Login.css';
import { Link } from 'react-router';
import ky from "ky";

class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            email_address: "",
            password: ""
        };
        this.submitHandler = this.submitHandler.bind(this)
      }

        changeHandler = (e) => {
            this.setState({[e.target.name]: e.target.value})
        }

       async submitHandler (e) {
          //  try{
            e.preventDefault();
            var formData = {
                email_adress: this.state.email_address,
                password: this.state.password
            }
               return await ky.post("http://127.0.0.1:8000/login", {body: formData});

          //  }
          // catch (e) {
          //    console.log("Register error");
          // }
        }
    render(){
        const {email_address, password} = this.state
        return(
            <Container className="bkgd" fluid>
            <h1  className="header" >Photographer's portfolio</h1>
                <Form className="login-form" onSubmit={this.submitHandler}>
                <div className="box">
                    <h1 className="signIn">Sign In</h1>
                <FormGroup style={{paddingBottom:'5%', paddingTop:'5%'}}>
                <Input
                id="email_address"
                name="email_address"
                type="email"
                value={email_address}
                onChange={this.changeHandler}
                placeholder="Email"/>
                </FormGroup>
                <FormGroup style={{paddingBottom:'5%'}}>
                <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.changeHandler}
                placeholder="Password" />
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block" type="submit">Sign In</Button>
                <div className="text-center" style={{paddingTop:'8%'}}>
                <Button className="btn btn-dark" role="button">
                    <Link href="/register" style={{textDecoration: 'none', color:'white'}}>
                    Sign Up
                    </Link>
                </Button>
                <span className="p-2"></span>
                <a href="/forgot-password" className="btn btn-dark" role="button">Forgot Password</a>
                </div>
                <div className="text-center" style={{paddingTop:'5%', color:"white"}}>
                By clicking “Sign up”, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Statement</a>.
                </div>
                </div>
            </Form>
            </Container>
        );
    }
}

export default Login;