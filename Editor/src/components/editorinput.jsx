import React, {Component,useState} from "react";
import styled from "styled-components";
import { Button, Form, FormGroup, Input,} from 'reactstrap';
import ky from "ky";

const Container =styled.div`
    width: 50%;
    heigth: 100%;
    padding: 13px;
    border-right: 1.5px solid rgba(15,15,15,0.4);
    font-family: 'Lato', sans-serif;
    

    `;

const Title = styled.div` 
    font-size: 22px;
    font-weight: 600;
    margin-bottom 1em;
    padding: 8px 0;
    border-bottom:1px solid rgba(15,15,15,0.3);
   
    `;

const TextArea = styled.textarea`
    width: 100%; 
    height: 100%;
    resize: none;
    border: none;
    outline none;
    font-size: 12px;
    // background: #737373;
    `; 


    




      

//  function handleClick(e) {
//       e.preventDefault();
//       console.log('Kliknięto w link.');
//      }
    

    


// export function EInput(props) {


    class Texted extends Component{
     constructor(props){
     super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={
    description: ""
        
        }

     }


     handleSubmit = e => {
         e.preventDefault()
         fetch('/', {
                   method: 'post',
                   headers: {'Content-Type':'application/json'},
                   body: JSON.stringify({
                    "description": this.state.description
                   })
                 })
                 .then(response => response.json())
                 .then(data => this.setState({postId:data.id}));
     }





     render(){
    
        return( 
        <Container>
            <Form className="text-description" onSubmit={this.handleSubmit}>
            <Title>Jinja2 code </Title>
            <button type="submit" >Test</button>
            <TextArea id="description" value={this.state.description} onChange={(ev)=>this.setState({description:ev.target.value})} /> 
           
            </Form>
        </Container>
        );}}
    export default Texted;
///////////////////////////////////////////////////////////////////////////////////

    

    