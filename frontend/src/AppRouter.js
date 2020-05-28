import React, { Component, useState, useEffect, useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MainPage from "./components/MainPage";
import Editor from "./components/Editor/Editor";
import MainPageAlbum from "./components/Albums/MainPageAlbum";
import MainPagePage from "./components/Albums/MainPagePage";
import { SessionContext, getSessionCookie, setSessionCookie } from "./contexts/Loggedcontext";

const AppRouter = () => {
  const [session, setSession] = useState(getSessionCookie());
  useEffect(
    () => {
      setSession(getSessionCookie());
    },
    [session]
  );
  return (
    <SessionContext.Provider value={session}>
    <div>
      <Switch>
        <Route exact path="/">
          <Redirect to="login" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/mainPage" component={MainPage} />
        <Route path="/mainPageAlbum" component={MainPageAlbum} />
        <Route path="/mainPagePage" component={MainPagePage} />
        <Route path="/editor" component={Editor} />
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
    </SessionContext.Provider>
  );
};

export default AppRouter;
