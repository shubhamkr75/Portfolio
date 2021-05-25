import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Questions from './Component/Questions'
import ExamCreation from './Component/ExamCreation'
import Registration from './Component/Resgistration';
import Login from './Component/Login';
import UseToken from './Component/UseToken';
import Approval from './Component/Approval';
import dotenv from 'dotenv'
import './Component/Popup.css';

import TeacherDashboard from './Component/TeacherDashboard';
import Profile from './Component/Profile';
import FetchAllUsers from './Component/FetchAllUsers';
import FetchAdmins from './Component/fetchAdmins';
import Header from './Component/Header';
import StudentDashboard from './Component/StudentDashboard';
import Footer from './Component/Footer';
import LoadingAnimation from './Component/LoadingAnimation';
import Reset from './Component/Reset';
import Newpassword from './Component/Newpassword';

dotenv.config();
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
    return(
      <div>            
        <Header loginType=""/>   
        <BrowserRouter>
        <Switch>
        <Route path="/registration">
            <Registration />
        </Route>
        <Route path="/ForgotPassword">
            <Reset />
        </Route>
        <Route path="/reset/:token">
            <Newpassword />
        </Route>
        <Login setToken={setToken} />
        </Switch></BrowserRouter>
        <Footer/>
      </div>
    );
  }

  return (

    <div className="wrapper">
      <Header loginType={token.Login_Type}/> 
      <div className="main">
      <BrowserRouter>
        <Switch>
          <Route path="/examcreation">
          {token.Login_Type==2 && <ExamCreation schoolId={token.School_id} studentId={token.Student_id}/>}
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/teacherdashboard">
          {token.Login_Type==2 && <TeacherDashboard schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/>}
          </Route>
          <Route path="/Exams">
            <Questions schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/>
          </Route>
          <Route path="/Registration">
            <Registration />
          </Route>
          <Route path="/studentdashboard">
            <StudentDashboard schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/>
          </Route>    
          <Route path="/Approval">
            {token.Login_Type==2 && <Approval schoolId={token.School_id}/>}
          </Route>
          <Route path="/FetchAllUsers">
          {token.Login_Type==2 && <FetchAllUsers  schoolId={token.School_id}/>}
          </Route>    
          <Route path="/FetchAdmins">
              {token.Login_Type==2 && <FetchAdmins  schoolId={token.School_id}/>}
          </Route>   
          <Route path="/">
          {/* <FetchAllUsers  schoolId={token.School_id}/> */}
          {/* <FetchAdmins  schoolId={token.School_id}/> */}
          {/* <TeacherDashboard schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/> */}
          {/* <Approval schoolId={token.School_id}/> */}
          {/* <ForgotPassword schoolId={token.School_id}/> */}
          {/* <Profile  studentId={token.Student_id}/> */}
          {token.Login_Type==2 && <TeacherDashboard schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/>}
          {token.Login_Type==1 && <Questions schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/>}
          {/* <LoadingAnimation  studentId={token.Student_id}/> */}
          {/* <Questions schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/> */}
          </Route>
        </Switch>
      </BrowserRouter>
      </div>     
    <Footer/>
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <Login/>
    //   </header>
    // </div>
  );
}

export default App;
