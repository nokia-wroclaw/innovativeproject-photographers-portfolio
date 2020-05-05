import React, {Component, useState} from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router';
import { Container ,Row, Button, Col} from 'reactstrap';
import Footer from './Footer'
import Modal from './Modal'
import ListItems from './ListAlbum'
import './MainPage.scss';
import {IoIosPower, IoIosAdd, IoIosImages, IoIosCube} from 'react-icons/io'
import { IconContext } from 'react-icons';



class MainPageAlbum extends Component{
  state = {
    show: false,
    items: [],
    key: ''
  };
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };
  
  
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:''
      }
    })
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }
  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    
   
  }

    render(){
        return(    
            <Container className="mainPageBkgd" fluid style={{paddingLeft:'0', paddingRight:'0'}}>      
                <Navbar collapseOnSelect expand="xl" className="color-nav" variant="dark" fixed="">
                  <Navbar.Brand>
                    <Link to="/mainPage" className="text nav" style={{textDecoration:'none', color:'#077cc5'}}>
                      Alusia Pimpusia
                    </Link>
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                      <Nav.Link href="#deets" className="text" style={{color:'#077cc5'}}>Photos</Nav.Link>
                      <Nav.Link href="/editor" className="text" style={{color:'#077cc5'}}>Edit Page</Nav.Link>
                      <Nav.Link href="#deets" className="text" style={{color:'#077cc5'}}>Messages</Nav.Link>
                      <Nav.Link href="#deets" className="text" style={{color:'#077cc5'}}>Settings</Nav.Link>
                      <Nav.Link href="#deets" >
                        <IconContext.Provider value={{size:'2em', color:'#077cc5'}}>
                          <IoIosPower/>
                        </IconContext.Provider>
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
                <Row>
                <Col style={{maxWidth:'15%'}}>
                <Nav className="flex-column color-nav verticalThin">
                      <Nav.Link href="/mainPageAlbum" className="text verticalNav" >
                        <IoIosImages/>
                        <span className="p-2"></span>
                        My albums
                      </Nav.Link>
                      <Nav.Link href="/mainPagePage" className="text verticalNav" >
                        <IoIosCube/>
                        <span className="p-2"></span>
                        My pages
                      </Nav.Link>                      
                    </Nav>
                </Col>
                <Col>                
                <Row className="text-center" >              
                  <Container fluid style={{paddingTop:'80px',alignItems:'center', display:'flex'}}>
                    <Container className="text subHeader title" style={{paddingLeft:'40px'}}>My Albums</Container>                 
                  </Container>                  
                </Row> 
                <Row className="text-center" style={{paddingTop:'5%'}} >
                  <Container className="add-element" fluid>
                  <h1 className="texth">Please enter Album Name:</h1>
                  <span className="p-2"></span>
                  <form id="to-do-form" onSubmit={this.addItem}>
                    <input type="text" placeholder="Enter name" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
                    <span className="p-2"></span>
                    <button type="submit" className="buttonLightPink">
                      <IconContext.Provider value={{size:'2em',color:'#ceb1ba'}}>
                        <IoIosAdd/>
                      </IconContext.Provider>
                    </button>
                  </form>
                  <p>{this.state.items.text}</p>
                  </Container>
                </Row>
                <Row style={{paddingTop:'40px', paddingLeft:'50px', paddingLeft:'10%', paddingTop:'5%'}}>
                
        
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
        
         
                </Row>                 
                </Col>  
                </Row>
                <Container fluid style={{position:'fixed', bottom:'0', paddingLeft:'0', paddingRight:'0'}}>
                  <Footer />
                </Container>
            </Container> 
            
        );
    }
}

export default MainPageAlbum;