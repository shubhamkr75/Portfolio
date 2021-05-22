import React, { Component } from 'react';
import App from '../App';
import ConfirmationMessage from './ConfirmationMessage';
import LoadingAnimation from './LoadingAnimation';
import Login from './Login';
import Popup from './Popup';
 
class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {          
          flag:0,
          profileData:[],
          fetchedProfile:false,
        }; 
      }
    
// user registration
fetchUserProfile(){
    this.setState({fetchedProfile:true});
        fetch(`https://node-new.herokuapp.com/users/fetchUserProfile`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: 
             JSON.stringify({
                studentId: this.props.studentId,
            })
          })
        .then((res) => res.json())
        .then((data) => {           
           console.log(data); 
           this.setState({flag:1,profileData:data.recordset[0]});                        
        })
        .catch(err => {
            console.log(err);
            this.setState({flag:2}); 
        });
      }
 
render(){     
    {!this.state.fetchedProfile && this.fetchUserProfile()} 
    if(this.state.profileData.length!=0&&this.state.flag==1){
    return(        
        <div className="container-fluid login-component px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://i.imgur.com/uNGdWHi.png" className="image" /> </div>
                        </div>
                    </div>
                    <div className="col-lg-6">                                       
                        <div className="card2 card border-0 px-4 py-5">
                            <h1>Profile</h1>
                            <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Name: {this.state.profileData.Student_Name}</h6>
                                </label> </div>
                            <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Email ID: {this.state.profileData.Email_Address}</h6>
                                </label> </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">School Name: {this.state.profileData.School_Name}</h6>
                                </label>
                            </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Class: {this.state.profileData.Class}</h6>
                                </label>
                                <label id="examCode"></label>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
            {/* <Popup/>             */}
        </div>
    );
    }
    else if(this.state.flag==4){
        return(
            <div><h1 class="display-3">Registration is successful</h1>
                <p class="lead"><strong>Name: {this.state.name}</strong> </p>
            </div>
            
        );
    }
    else if(this.state.flag==3){
      return(
          <App/>
      );
    }
    else if(this.state.flag==2){
        let confirmation={
            success:false,
            message: <div className="message-info">Something went wrong</div>,
            url:"./studentdashboard"
        }
        return (
            <ConfirmationMessage success={confirmation.success} message={confirmation.message} url={confirmation.url}/>    
        );
      }
    else{
        return(            
            <LoadingAnimation/>
        );
    }
}
}
export default Profile;
