import React from 'react';

import './App.css';
import styled from "styled-components";
import { EInput } from './components/editorinput';
import { Result } from './components/result';



const AppContainer = styled.div`
width: 100%;
height 100%;
display: flex;
flex-direction: column;
align-items: center;

`;

const Title = styled.div`
font-size: 25px;
font-weight: 700;
font-family: "Lato", sans-serif;
margin-bottom 1em;
`;

const EditorContainer = styled.div`
width: 100%;
height: 100%;
display: flex;

`;

export default function App() {
  return (
  
    <AppContainer>
      <Title>Editor UI</Title>
     <EditorContainer>
     <EInput />
     <Result />
     </EditorContainer>
    </AppContainer>
  );
}


