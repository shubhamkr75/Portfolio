import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Questions from './Component/Questions'
import ExamCreation from './Component/ExamCreation'
import Registration from './Component/Resgistration';
import Login from './Component/Login';
import UseToken from './Component/UseToken';
import TeacherDashboard from './Component/TeacherDashboard';

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

function App() {
  // const token = getToken();
  const { token, setToken } = UseToken();

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
          <TeacherDashboard schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/>
          {/* <Questions schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/> */}
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
