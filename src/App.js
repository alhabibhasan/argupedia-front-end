import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import './App.css'
import Index from './components/pages/Index'
import RootArgs from './components/pages/RootArgs'
import ArgChain from './components/pages/ArgChain'

import Navigation from './components/organisms/Nav'
import Footer from './components/organisms/Footer'
import CreateArgument from './components/pages/CreateArgument'

import {index, roots, createArgument, readArgument} from './data/routes'

function App() {
  return (
    <Router>
      <div className='App'>
        <Navigation/>
        <Switch>
          <Route exact path={roots.defintion} render={(props) => <RootArgs {...props} />}></Route>
          <Route exact path='/argument/:id(\d+)' render={(props) => <ArgChain {...props}/>}></Route>
          <Route exact path={createArgument.defintion} render={(props) => <CreateArgument {...props}/>}></Route>
          <Route exact path={index.defintion} render={(props) => <Index {...props} />}></Route>
          <Route render={() => <Redirect to={index.defintion} />}></Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
