import React from 'react';
import { 
  Redirect, 
  Route, 
  BrowserRouter as Router, 
  Switch } from 'react-router-dom'

import { LoginPage } from './features/users/LoginPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
