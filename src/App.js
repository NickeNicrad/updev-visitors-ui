import React from 'react'
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home'
import Login from './components/pages/auth/Login'
import SignUp from './components/pages/auth/SignUp'
import Navbar from './components/NavBar'

function App()
{
  return (
    <Router>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  )
}

export default App
