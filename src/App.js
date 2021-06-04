import jwt from 'jsonwebtoken'
import React from 'react'
import { 
  Redirect, 
  Route, 
  BrowserRouter as Router, 
  Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from './app/Navbar'
import { LoginPage } from './features/users/LoginPage'
import { SignupPage } from './features/users/SignupPage'
import { TaskBoardsList } from './features/taskboards/TaskBoardsList'
import { Logout } from './app/Logout'

import setAuthToken from "./utils/setAuthToken"
import { getCurrentUser, setCurrentUser } from './features/filters/filtersSlice'
import { fetchUsers } from "./features/users/usersSlice"

function App() {
  const dispatch = useDispatch()
  const token = localStorage['jwt-token']
  if (token) {
    setAuthToken(token)
    const userId = jwt.decode(token).id
    dispatch(fetchUsers())
      .then(dispatch(setCurrentUser(userId)))
  }

  const currentUserId = useSelector(getCurrentUser)
  const isLoggedin = !!currentUserId

  return (
    <Router>
      <Navbar currentUserId={currentUserId} />
      <Switch>
        <Route exact path="/" component={isLoggedin ? TaskBoardsList : LoginPage} />
        <Route exact path="/login" component={isLoggedin ? TaskBoardsList : LoginPage} />
        <Route exact path="/signup" component={isLoggedin ? TaskBoardsList : SignupPage} />
        <Route exact path="/taskboards" component={isLoggedin ? TaskBoardsList : LoginPage} />
        <Route exact path="/logout" component={Logout} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
