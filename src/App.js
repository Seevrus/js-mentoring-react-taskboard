import React from 'react';
import { 
  Redirect, 
  Route, 
  BrowserRouter as Router, 
  Switch } from 'react-router-dom'
  import { useSelector } from 'react-redux'
import { LoginPage } from './features/users/LoginPage'
import { TaskBoardsList } from './features/taskboards/TaskBoardsList'
import { getCurrentUser } from './features/filters/filtersSlice';

function App() {
  const isLoggedin = !!useSelector(getCurrentUser)

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={isLoggedin ? TaskBoardsList : LoginPage} />
        <Route exact path="/login" component={isLoggedin ? TaskBoardsList : LoginPage} />
        <Route exact path="/taskboards" component={isLoggedin ? TaskBoardsList : LoginPage} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
