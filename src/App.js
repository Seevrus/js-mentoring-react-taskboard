import React from 'react';
import { 
  Redirect, 
  Route, 
  BrowserRouter as Router, 
  Switch } from 'react-router-dom'
import { TaskBoardsList } from './features/taskboards/TaskBoardsList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TaskBoardsList} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
