import React, {Component} from 'react';
import './App.css';
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
class App extends Component {
  render(){
    return (
      <div>
        <h1  className="header" >Photographer's portfolio</h1>
        <Login />
      </div>
    );
  }
}


export default App;
