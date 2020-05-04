import React, {Component,useState} from "react";
import './Input.css';
import { Form, Input, Button} from 'reactstrap';
import ky from "ky";

class Texted extends Component{
    constructor(props){
    super(props)
   this.state={
   description: ""
    }
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
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              nickname: this.state.nickname,
              additional_email: this.state.additional_email,
              password: this.state.password,
              repassword: this.state.repassword
             }
             return await ky.post("http://127.0.0.1:8000/input", {body: formData});
        //  }
        // catch (e) {
        //    console.log("Register error");
        // }
      }

    render(){
        const {textinput} = this.state
       return(
       <Container classname="text-cont">
           <Form className="text-description" onSubmit={this.submitHandler}>
           <Title className="text-title">Jinja2 code </Title>
           <button type="submit" >Compile</button>
           <Input
           className = "text-input"
           id="textinput"
           type="text"
           value={textinput}
           onChange={this.changeHandler}
           />
            <Button type="submit">Save</Button>
           </Form>
       </Container>
       );}}
   export default Texted;