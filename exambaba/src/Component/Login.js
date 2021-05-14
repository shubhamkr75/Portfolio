import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import PropTypes from 'prop-types';
import Registration from './Resgistration';
import ForgotPassword from './ForgotPassword';
import Header from './Header';
import Footer from './Footer';
import LoadingAnimation from './LoadingAnimation';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
 
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: "",
            userPassword: "",
            flag:0,
        };
 
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
 
        this.setState({
            [name]: value
        });
    }
    // user registration
    async loginUser() {        
         return fetch(`http://localhost:5000/users/loginUser`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body:
                JSON.stringify({
                    userEmail: this.state.userEmail,
                    userPassword: this.state.userPassword,
                })
        })
            .then((res) => res.json())
            .catch(err => {
                console.log(err);
                document.getElementById("passwordError").innerHTML="Please Enter a valid Email/Password";
              })
    }
 
    async handleSubmit(e){
        e.preventDefault();
        const token = await this.loginUser();
        if(token && token.token.approved!=1){
            document.getElementById("passwordError").innerHTML="User Not Approved";
        }
        else if(token){
            this.props.setToken(token);
        }
    }

    render() {
        if(this.state.flag==0){
        return (
        <div className="container-fluid login-component px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <Header/>
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://qph.fs.quoracdn.net/main-qimg-0b53e802c3afb1a1b08e549a99a213f3.webp" className="image" /> </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            
                            <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Email/UserID</h6>
                                </label> <input className="mb-4" type="text" name="userEmail" onChange={this.handleInputChange} placeholder="Enter a valid email address" /> </div>
                            <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Password</h6>
                                </label> <input type="password" name="userPassword" onChange={this.handleInputChange} placeholder="Enter password" /> </div>
                                <div><label id="passwordError">
                                <h6 className="mb-0 text-sm"></h6>
                                </label>
                                </div>
                            <div className="row px-3 mb-4">
                                <div className="custom-control custom-checkbox custom-control-inline"> <input id="chk1" type="checkbox" name="chk" class="custom-control-input" /> <label for="chk1" class="custom-control-label text-sm"> Remember me</label> </div> <a href="#" class="ml-auto mb-0 text-sm" onClick={()=>this.setState({flag:2})}>Forgot Password?</a>
                            </div>
                            {/* <div className="row mb-4 px-3"> <small className="font-weight-bold"><a className="text-right" onClick={()=>this.setState({flag:2})}>Forgot Password?</a></small> </div>            */}
                            <div className="row mb-3 px-3"> <button onClick={this.handleSubmit} type="submit" className="btn btn-blue text-center">Login</button> </div>
                            <div className="row mb-4 px-3"> <small className="font-weight-bold">Don't have an account? <a className="text-danger" onClick={()=>this.setState({flag:1})}>Register</a></small> </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
    }
    else if(this.state.flag==1){
        return(
            <Registration/>
        );
    }
    else if(this.state.flag==2){
        return(
            <ForgotPassword/>
        );
    }
    else{
        return(
        <LoadingAnimation/>
        );
    }
}
}
export default Login;
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
