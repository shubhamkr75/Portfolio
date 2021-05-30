import React, { Component } from 'react';
import LogOut from './LogOut';
class Header extends Component{
    constructor(props) {
        super(props); 
        this.toggleNavbar = this.toggleNavbar.bind(this);
      }
studentHeader(){
    return(
        <>            
            <li class="nav-item">
                <a class="nav-link" href="/studentdashboard">Past Examination</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/profile">Profile</a>
            </li>
        </>
    );
}
adminHeader(){
    return(
        <>
            <li class="nav-item">
                    <a class="nav-link" href="/examcreation">Exam Creation</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/teacherdashboard">Admin Exams</a>
            </li>                                
            <li class="nav-item">
                <a class="nav-link" href="/Approval">Approvals</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/FetchAllUsers">Users</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/FetchAdmins">Admins</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/studentdashboard">Dashboard</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/Exams">Live Exams</a>
            </li>
        </>
    );
}
logoutHeader(){
    return(
        <>
            <li class="nav-item">
            <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Contact Us</a>
            </li>
            <div className="registration-section">
                <button  type="submit" className="submit-button btn btn-blue text-center"><a href="/Registration">Registration</a></button>
            </div>
        </>
    );
}
toggleNavbar(){
    let navb=document.getElementById("navbarNav");
    if(navb!=null)
    document.getElementById("navbarNav").classList.toggle("show");
}

    render(){
        let logintype=this.props.loginType;
        return(
            <div className="header-component">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="row" > <a class="nav-link" href="Login.js"><img src="https://nncti.in/images/nncti.png" className="logo" /></a>  </div>
                        <button class="navbar-toggler" onClick={this.toggleNavbar} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link" href="/">Home</a>
                                </li>                                
                                {logintype==1 && this.studentHeader()}                                
                                {logintype==2 && this.adminHeader()}                               
                                {logintype!=1 && logintype!=2 && this.logoutHeader()}
                                {(logintype==1 || logintype==2) && <LogOut/>}                                
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