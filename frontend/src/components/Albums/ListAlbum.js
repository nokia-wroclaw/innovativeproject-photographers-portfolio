import React from 'react';
import {IoIosTrash, IoIosCamera} from 'react-icons/io'
import { IconContext } from 'react-icons';
import FlipMove from 'react-flip-move';
import { Container,Col,Row} from 'reactstrap';

function ListItems(props){
    const items = props.items;
    const listItems = items.map(item =>
   {
       return <div className="list" key={item.key}>
     <button className="buttonLightPink" style={{height:'400px', width:'400px'}}>
        <IconContext.Provider value={{size:'15em',color:'#ceb1ba'}}>
            <IoIosCamera/>
        </IconContext.Provider>
        <br/>
         {/*<input type="text" id={item.key} value={item.text} onChange={(e)=>{
             props.setUpdate(e.target.value,item.key)}}/>*/}
        <Row>
                <Container className="text" style={{alignItems:'center', fontSize:'40px'}}>
                    {item.text}
                </Container>
            </Row>
            <Row>
                <div style={{float:'right', right:'0', bottom:'0'}}>
                <button onClick={() => {props.deleteItem(item.key)}} className="buttonLightPink" style={{borderWidth:'0'}}>
                    <IconContext.Provider value={{size:'2em',color:'#5FBFF9'}}>
                        <IoIosTrash/>
                    </IconContext.Provider>
                </button>
                </div>
        </Row>
     </button>
    </div>})
    return <div>
        <FlipMove duration={300} easing="ease-in-out">
        {listItems}
        </FlipMove>
    </div>;
  }

  export default ListItems;