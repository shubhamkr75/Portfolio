import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Questions from './Component/Questions'
import ExamCreation from './Component/ExamCreation'
import Registration from './Component/Resgistration';
import Login from './Component/Login';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/examcreation">
            <ExamCreation />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/">
            <Questions/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <Login/>
    //   </header>
    // </div>
  );
}

export default App;
