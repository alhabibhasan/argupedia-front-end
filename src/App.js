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

function App() {
  return (
    <Router>
      <div className='App'>
        Argupedia!

        <nav>
          <Link to="/">Home</Link>
          <br/>
          <Link to="/graphs/roots">Views All Roots</Link>
        </nav>
        
        <Switch>
          <Route exact path="/graphs/roots" render={(props) => <RootArgs {...props} />}></Route>
          <Route exact path="/graphs/argument/:id(\d+)" render={(props) => <ArgChain {...props}/>}></Route>
          <Route exact path="/" ><Index/></Route>
          <Route render={() => <Redirect to="/" />}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
