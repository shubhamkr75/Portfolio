import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import PropTypes from 'prop-types';
import Newpassword from './Newpassword'
import ConfirmationMessage from './ConfirmationMessage';
import examlogo from '../Assets/image/exam-center.webp';

// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
 
class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: "",
            flag:0,
            credentialflag:0,
        };
 
        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetUser = this.resetUser.bind(this);
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
    
    async resetUser() {        
         return fetch(`https://node-new.herokuapp.com/users/reset-password`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body:
                JSON.stringify({
                    userEmail: this.state.userEmail,
                })
        })
        .then((res) => res.json())
        .then((data) => {   
            if(data.result==1)        
            alert('Password reset link sent to your mail!'); 
            else if(data.result==-1) 
            alert('The entered email does not exist!')
            else
            alert('Try agin!')
           this.setState({flag:1});             
        }).catch(err => {
                console.log(err);
                //this.setState({credentialflag:1});
                //document.getElementById("passwordError").innerHTML="Please Enter a valid Email";
              });
            // .then((data) => {
            //     console.log(data);
            // });
    }
 
    async handleSubmit(e){
        e.preventDefault();
        //const result = await this.resetUser();
        this.resetUser();
        //var temp = ""+result;
        //console.log(result)
        //alert(result)
        // if(token){
        //     this.setState({credentialflag:0});
        //     this.props.setToken(token);
        // }
    }

    render() {
        if(this.state.flag==0){
        return (
        <div className="container-fluid login-component px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">                            
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src={examlogo} className="image" /> </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            
                            <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Email Address</h6>
                                </label> <input className="mb-4" type="text" name="userEmail" onChange={this.handleInputChange} placeholder="Enter a valid email address" /> </div>
                                <div className="row mb-3 px-3"> <button onClick={this.handleSubmit} type="submit" className="btn btn-blue submit-button text-center">Reset password</button> </div>
                                </div>
                            
                            
                        
                    </div>
                </div>
            </div>
        </div>
    );
    }
    else if(this.state.flag==1){
        //alert("Password reset link sent to your mail.")
        return(
            //<Reset/>
            <Newpassword/>
            //<App/>
        );
      }
    else{
        let confirmation={
            success:false,
            message: <div className="message-info">Cannot Render Data</div>,
            url:"./registration"
        }
        return (
            <ConfirmationMessage success={confirmation.success} message={confirmation.message} url={confirmation.url}/>    
        );
    }
}
}
export default Reset;
// Reset.propTypes = {
//     setToken: PropTypes.func.isRequired
// }
