import React, { Component } from 'react';
import LogOut from './LogOut';
class Header extends Component{
    render(){

        return(
            <div className="nav" id="navbar">
                <div class="deskItems">
                    <a href="/">Home</a>
                    <a href="/examcreation">Exam Creation</a>
                    <a href="/teacherdashboard">Teacher Dashboard</a>
                    <a href="/studentdashboard">Student Dashboard</a>
                    <a href="/Exams">Exams</a>
                    <a href="/Approval">Approvals</a>
                    <LogOut/>
                </div>
                <div className="burger">
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </div>
        );
    }
}
export default Header;