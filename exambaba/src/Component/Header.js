import React, { Component } from 'react';
import LogOut from './LogOut';
class Header extends Component{
    render(){
        return(
            <div className="header-component">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="row" > <a class="nav-link" href="Login.js"><img src="https://nncti.in/images/nncti.png" className="logo" /></a>  </div>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                    <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/examcreation">Exam Creation</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/teacherdashboard">Teacher Dashboard</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/studentdashboard">Student Dashboard</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/Exams">Exams</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/Approval">Approvals</a>
                                </li>
                                <LogOut/>
                            </ul>
                        </div>
                    </nav>   
            </div>

            // <div className="nav" id="navbar">
            //     <div class="deskItems">
            //         <a href="/">Home</a>
            //         <a href="/examcreation">Exam Creation</a>
            //         <a href="/teacherdashboard">Teacher Dashboard</a>
            //         <a href="/studentdashboard">Student Dashboard</a>
            //         <a href="/Exams">Exams</a>
            //         <a href="/Approval">Approvals</a>
            //         <LogOut/>
            //     </div>
            //     <div className="burger">
            //         <div className="line1"></div>
            //         <div className="line2"></div>
            //         <div className="line3"></div>
            //     </div>
            // </div>
        );
    }
}
export default Header;