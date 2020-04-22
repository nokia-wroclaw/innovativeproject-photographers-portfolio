import React from "react";
import styled from "styled-components"

const Container =styled.div`
width: 50%;
height: 100%;
padding: 13px;
font-family: "Lato", sans-serif;
`;

const Title = styled.div`
font-size: 22px;
font-weight: 600;
margin-bottom: 1em;
padding: 8px 0;
border-bottom: 1px solid rgba(15,15,15,0.3);
`;

export function Result(props){
    return <Container>
        <Title>Preview</Title>
    </Container>
}