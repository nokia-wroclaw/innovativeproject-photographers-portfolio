import React from 'react';
import './Modal.css';
import { FormGroup, Container,Button} from 'reactstrap';
import {IoIosClose} from 'react-icons/io'
import { IconContext } from 'react-icons';

class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if(!this.props.show){
      return null;
  }
return (
<div className='popup'>
  <div className='popup-inner'>
    <div style={{float:'right'}}>
      <button onClick={this.onClose} className="close">
        <IconContext.Provider value={{size:'40px', color:'#5FBFF9'}}>
          <IoIosClose/>
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

