import React from 'react'
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home'
import Navbar from './components/NavBar'
import Footer from "./components/Footer"
import Login from './components/pages/auth/Login'
// import Home from './test/components/Home'

function App()
{
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* <PrivateRoute exact path="/" component={Home} /> */}
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
