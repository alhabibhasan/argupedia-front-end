import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom"

import './App.css'
import Index from './pages/Index'
import RootArgs from './pages/RootArgs'
import ArgChain from './pages/ArgChain'

import Navigation from './components/organisms/Nav'
import Footer from './components/organisms/Footer'

function App() {
  return (
    <Router>
      <div className='App'>
        <Navigation/>
        <Switch>
          <Route exact path="/graphs/roots" render={(props) => <RootArgs {...props} />}></Route>
          <Route exact path="/graphs/argument/:id(\d+)" render={(props) => <ArgChain {...props}/>}></Route>
          <Route exact path="/" ><Index/></Route>
          <Route render={() => <Redirect to="/" />}></Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
