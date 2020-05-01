import React from 'react';  
import './Modal.css';  
import { FormGroup, Container,Button} from 'reactstrap';
import {IoIosCloseCircle} from 'react-icons/io'
import { IconContext } from 'react-icons';

class Modal extends React.Component {  
  render() {  
return (  
<div className='popup'>  
  <div className='popup-inner'>
    <div style={{float:'right'}}>
      <button onClick={this.props.closePopup} className="close">
        <IconContext.Provider value={{size:'30px', color:'rgba(111, 68, 78,1)'}}>
          <IoIosCloseCircle/>
        </IconContext.Provider>
      </button>   
    </div>
    <h1 className="text" style={{paddingTop:'35px'}}>Please enter name:</h1> 
    <FormGroup style={{paddingBottom:'5%', paddingTop:'5%'}}>
      <input type="text" placeholder="Name"/>
      <span className="p-2"></span>
      <Button className="btn btn-dark">Confirm</Button>
    </FormGroup>  
  </div>  
</div>  
);  
}  
}  

export default Modal;
