import React from 'react'
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home'
import Navbar from './components/NavBar'
import Footer from "./components/Footer"
// import Visitors from "./components/pages/Visitors"
// import Visits from "./components/pages/Visits"
import Login from './components/pages/auth/Login'
import SignUp from './components/pages/auth/SignUp'

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
      <Footer />
    </Router>
  )
}

export default App
