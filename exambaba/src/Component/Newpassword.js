import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { withRouter } from "react-router";
import {useParams} from 'react-router-dom'
import PropTypes from 'prop-types';
import Registration from './Resgistration';
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
import ConfirmationMessage from './ConfirmationMessage';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
function BlogPost() {
    let { id } = useParams();
    return id;
  }
    
class Newpassword extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userPassword: "",
            flag:0,
            token:null,
            credentialflag:0,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        //this.loginUser = this.loginUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    componentDidMount() {
        this.setState({token:this.props.match.params.token})
        // this.fetchData(id);
        
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
    async newPassword() {        
         return fetch(`https://node-new.herokuapp.com/users/new-password`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body:
                JSON.stringify({
                    userPassword: this.state.userPassword,
                    token:this.state.token
                })
        })
            .then((res) => res.json())
            .then((data) => {   
                if(data.message!=null||data.message!=''||data.message!=undefined)        
                alert('Password reset successfully done!'); 
                else if(data.result==-1) 
                alert('URL is not correct click link in your mail again!')
                else if(data.result==-2) 
                alert('This link is not valid any more, try again!')
                else
                alert('Try agin!')
               this.setState({flag:1});             
            }).catch(err => {
                console.log(err);
                this.setState({credentialflag:1});
                document.getElementById("passwordError").innerHTML="Please Enter a valid Email/Password";
              });
            // .then((data) => {
            //     console.log(data);
            // });
    }
 
    async handleSubmit(e){
        e.preventDefault();
        //const token = await this.loginUser();
        this.newPassword();
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
                            <div className="row"> <img src="https://i.imgur.com/CXQmsmF.png" className="logo" /> </div>
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://i.imgur.com/uNGdWHi.png" className="image" /> </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            
                            <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Password</h6>
                                </label> <input type="password" name="userPassword" onChange={this.handleInputChange} placeholder="Enter your new password" /> 
                            </div>
                            <div className="row mb-3 px-3"> <button onClick={this.handleSubmit} type="submit" className="btn btn-blue submit-button text-center">Submit your new password</button> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
//export default Newpassword;
export default withRouter(Newpassword);

