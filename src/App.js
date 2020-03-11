import React, {useState, useEffect} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import './App.css'
import Index from './components/pages/Index'
import RootArgs from './components/pages/RootArgs'
import ViewArgument from './components/pages/ViewArgument'
import LoginView from './components/pages/Auth/Login'
import LogoutView from './components/pages/Auth/Logout'
import PasswordResetView from './components/pages/Auth/PasswordReset'
import RegisterView from './components/pages/Auth/Register'


import Navigation from './components/organisms/Nav'
import Footer from './components/organisms/Footer'
import CreateArgument from './components/pages/CreateArgument'

import {index, roots, createArgument, auth} from './data/routes'
import authListener from './data/auth/auth-listener'
import Profile from './components/pages/Auth/Profile'

function App() {
  const [user, setUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    authListener(setUser, setCheckingAuth)
  })

  return (
    <Router>
      <div className='App'>
        <Navigation role="navigation" user={user}/>
        <Switch role="main">
          <Route exact path={roots.defintion} render={(props) => <RootArgs user={user} {...props} />}></Route>
          <Route exact path='/argument/:id(\d+)' render={(props) => <ViewArgument user={user} {...props}/>}></Route>
          <Route exact path={createArgument.defintion} render={(props) => <CreateArgument user={user} {...props}/>}></Route>
          <Route exact path={index.defintion} render={(props) => <Index user={user} {...props} />}></Route>
          <Route exact path={auth.login.use} render={(props) => <LoginView user={user} {...props} ></LoginView>}></Route>
          <Route exact path={auth.logout.use} render={(props) => <LogoutView user={user} {...props} ></LogoutView>}></Route>
          <Route exact path={auth.register.use} render={(props) => <RegisterView user={user} {...props} ></RegisterView>}></Route>
          <Route exact path={auth.passwordReset.use} render={(props) => <PasswordResetView user={user} {...props} ></PasswordResetView>}></Route>
          <Route exact path={auth.profile.use} render={(props) => <Profile user={user} {...props} checkingAuth={checkingAuth}></Profile>}></Route>
          <Route render={() => <Redirect to={index.defintion} />}></Route>
        </Switch>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
