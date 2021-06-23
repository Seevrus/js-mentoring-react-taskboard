import React, { useEffect } from 'react'
import { 
  Redirect, 
  Route, 
  BrowserRouter as Router, 
  Switch } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Navbar } from './app/Navbar'
import { LoginPage } from './features/users/LoginPage'
import { SignupPage } from './features/users/SignupPage'
import { TaskBoardsList } from './features/taskboards/TaskBoardsList'
import { Logout } from './app/Logout'
import { getCurrentUser, setCurrentUser } from './features/filters/filtersSlice'
import { checkLoginStatus, fetchUsers } from "./features/users/usersSlice"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLoginStatus())
      .then(res => {
        if (!res.payload.error) {
          dispatch(fetchUsers())
            .then(dispatch(setCurrentUser(res.payload.id)))
        }
      })
  }, [dispatch])

  const currentUserId = useSelector(getCurrentUser, shallowEqual)
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
