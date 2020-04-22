import React from "react";
import styled from "styled-components";

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

    



export function EInput(props) {
        return <Container>
            <Title>Jinja2 code </Title>
            <TextArea id="text"> Hello world </TextArea>  
        </Container>
    }


    