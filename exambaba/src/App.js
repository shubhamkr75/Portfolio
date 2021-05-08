import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Questions from './Component/Questions'
import ExamCreation from './Component/ExamCreation'
import Registration from './Component/Resgistration';
import Login from './Component/Login';
import UseToken from './Component/UseToken';
import Approval from './Component/Approval';
import ForgotPassword from './Component/ForgotPassword';


import TeacherDashboard from './Component/TeacherDashboard';
import Profile from './Component/Profile';
import FetchAllUsers from './Component/FetchAllUsers';
import FetchAdmins from './Component/fetchAdmins';
import Header from './Component/Header';
import StudentDashboard from './Component/StudentDashboard';

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
      <Header/>
      <BrowserRouter>
        <Switch>
          <Route path="/examcreation">
            <ExamCreation schoolId={token.School_id} studentId={token.Student_id}/>
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/teacherdashboard">
            <TeacherDashboard schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/>
          </Route>
          <Route path="/Exams">
            <Questions schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/>
          </Route>
          <Route path="/studentdashboard">
            <StudentDashboard schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/>
          </Route>          
          <Route path="/">
          {/* <FetchAllUsers  schoolId={token.School_id}/> */}
          {/* <FetchAdmins  schoolId={token.School_id}/> */}
          {/* <TeacherDashboard schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/> */}
          {/* <Approval schoolId={token.School_id}/> */}
          {/* <ForgotPassword schoolId={token.School_id}/> */}
          <Profile  studentId={token.Student_id}/>

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
