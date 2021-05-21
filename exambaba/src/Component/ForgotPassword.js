import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import PropTypes from 'prop-types';
import Registration from './Resgistration';
import App from '../App';
 
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: "",
            flag:0,
            credentialflag:0,
        };
 
        this.handleInputChange = this.handleInputChange.bind(this);
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
    
 
    async handleSubmit(e){
       
    }

    render() {
        if(this.state.flag==0){
        return (
        <div className="container-fluid login-component px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            {/* <div className="row"> <img src="https://i.imgur.com/CXQmsmF.png" className="logo" /> </div> */}
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://i.imgur.com/uNGdWHi.png" className="image" /> </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            
                            <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Email Address</h6>
                                </label> <input className="mb-4" type="text" name="userEmail" onChange={this.handleInputChange} placeholder="Enter a valid email address" /> </div>
                            <div className="row mb-3 px-3"> <button onClick={this.handleSubmit} type="submit" className="btn btn-blue text-center">Send OTP</button> </div>
                            <div className="row mb-4 px-3"> <small className="font-weight-bold">Remember the password? <a className="text-danger" href="/">Login</a></small> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }
    else{
        return(
        <div>Cannot render data</div>
        );
    }
}
}
export default ForgotPassword;
