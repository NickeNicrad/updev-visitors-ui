import React from 'react';
import {Redirect, Route} from "react-router-dom"

const PrivateRoute = ({component: Component, ...rest})=> {
  return (
      <Route {...rest} component={props => {
          const user = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null;
          if (user) {
              return <Component {...props}/>
          } else {
              return <Redirect to="/login"/>
        }
      }} />
  );
}
export default PrivateRoute;