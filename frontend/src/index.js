import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login'
import Register from './components/Register'
import MainPage from './components/MainPage'
import MainPageAlbum from './components/MainPageAlbum'
import MainPagePage from './components/MainPagePage'
import * as serviceWorker from './serviceWorker';
import { Router, Route, browserHistory } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/mainPage" component={MainPage} />
    <Route path="/mainPageAlbum" component={MainPageAlbum} />
    <Route path="/mainPagePage" component={MainPagePage} />
  </Router>,
  /*<React.StrictMode>
    <App />
  </React.StrictMode>,*/
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
