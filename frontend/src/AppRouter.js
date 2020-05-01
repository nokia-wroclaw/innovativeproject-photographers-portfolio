import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch, useLocation } from "react-router-dom";
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import MainPage from './components/MainPage'

function AppRouter () {
//   const location = useLocation();
//   const [isLogged, setIsLogged] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getToken = async () => {
//       try {
//         await ky.get("/api/get-access-token");
//         setIsLogged(true);
//       } catch (e) {
//         setIsLogged(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getToken();
//   }, [location]);

//   return loading ? (
//     <GridLoader loading={loading} color="#68b3e1" />
//   ) : (
  return(
    <div>
      {/* <LoggedContext.Provider value={isLogged}> */}
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
      {/* </LoggedContext.Provider> */}
    </div>
   );
};

export default AppRouter;