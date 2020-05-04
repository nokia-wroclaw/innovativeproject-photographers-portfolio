import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";
import ky from 'ky';

function Editor() {
    return (
      <div className="Editor">
            <AppContainer>
            <Title>Editor UI</Title>
            <EditorContainer>
            <Texted />
            <Result />
            </EditorContainer>
            </AppContainer>
        </div>
    );
  }

export default Editor;
