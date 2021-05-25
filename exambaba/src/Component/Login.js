import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import PropTypes from 'prop-types';
import Registration from './Resgistration';
import Header from './Header';
import Footer from './Footer';
import examlogo from '../Assets/image/examination.png';
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
         return fetch(`https://node-new.herokuapp.com/users/loginUser`, {
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
            
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5 pt-5">
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src={examlogo} className="image" /> </div>
                            {/* <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src={examlogo} className="image " /> </div> */}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            <form onSubmit={this.handleSubmit}>
                            <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm input-text">Email/UserID<span className="asterik"> *</span></h6>
                                </label> <input className="mb-4 input-field" type="text" required name="userEmail" onChange={this.handleInputChange} placeholder="Enter a valid email address" /> </div>
                            <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm input-text">Password<span className="asterik"> *</span></h6>
                                </label> <input  className="input-field" type="password" name="userPassword" required  onChange={this.handleInputChange} placeholder="Enter password" /> </div>
                                <div><label className="asterik" id="passwordError">
                                <h6 className="mb-0 text-sm"></h6>
                                </label>
                                </div>
                            <div className="row px-3 mb-4">
                                 <a href="/ForgotPassword" class="ml-auto mb-0 text-sm" >Forgot Password?</a>
                            </div>
                            {/* <div className="row mb-4 px-3"> <small className="font-weight-bold"><a className="text-right" onClick={()=>this.setState({flag:2})}>Forgot Password?</a></small> </div>            */}
                            <div className="row mb-3 px-3"> <button  type="submit" className="btn submit-button text-center">Login</button> </div>
                            </form>
                            <div className="row mb-4 px-3"> <small className="font-weight-bold">Don't have an account? <a className="text-danger" href="/Registration">Register</a></small> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
