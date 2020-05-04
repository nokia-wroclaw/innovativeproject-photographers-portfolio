import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import MainPage from './components/MainPage'

function AppRouter () {
  return(
    <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="login" />
          </Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/mainPage" component={MainPage} />
        <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
    </div>
   );
};

export default AppRouter;