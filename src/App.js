import React from 'react';
import { 
  Redirect, 
  Route, 
  BrowserRouter as Router, 
  Switch } from 'react-router-dom'
import { TaskBoardList } from './features/taskboards/TaskBoardList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TaskBoardList} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
