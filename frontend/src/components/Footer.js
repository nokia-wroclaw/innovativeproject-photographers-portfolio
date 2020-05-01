import React, {Component} from 'react';
import { Container, Row, Col} from 'reactstrap';
import { Link } from 'react-router';
import './Footer.scss'

class Footer extends Component{
    render(){
        const date = new Date()
        return(
            <Container className="text-center footer" fluid>
                <Row>      
                    <Col className="text" style={{color:'#077cc5', left:'0'}}>            
                        © {date.getFullYear()} Photographer's Portfolio, Inc.
                        <span className="p-4"></span>
                        <Link to="/term" className="text" style={{color:'#077cc5', left:'0'}}>Terms</Link>
                        <span className="p-4"></span>
                        <Link to="/privacy" className="text" style={{color:'#077cc5', left:'0'}}>Privacy</Link>            
                   </Col>
                </Row>
            </Container>
        );
    }
}

export default Footer;