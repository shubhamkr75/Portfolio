import React, { Component } from 'react';
import App from '../App';
import ConfirmationMessage from './ConfirmationMessage';
import LoadingAnimation from './LoadingAnimation';
import examlogo from '../Assets/image/examination.png';
import Login from './Login';
import Popup from './Popup';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: 0,
            profileData: [],
            fetchedProfile: false,
        };
    }

    // user registration
    fetchUserProfile() {
        this.setState({ fetchedProfile: true });
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
                this.setState({ flag: 1, profileData: data.recordset[0] });
            })
            .catch(err => {
                console.log(err);
                this.setState({ flag: 2 });
            });
    }

    render() {
        { !this.state.fetchedProfile && this.fetchUserProfile() }
        if (this.state.profileData.length != 0 && this.state.flag == 1) {
            return (
                <div className="container-fluid login-component px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                    <div className="card card0 border-0">
                        <div className="row d-flex">
                            <div className="col-lg-3 profile-image-section">
                                <div className="card1 pb-5 align-center">
                                    <div className="row px-3 justify-content-center mt-4 mb-5"> <img  src={examlogo} className="image profile-image" /> </div>
                                    <h3>{this.state.profileData.Student_Name}</h3>
                                    <p>{this.state.profileData.Email_Address}</p>
                                </div>
                            </div>
                            <div className="col-lg-9 card ">
                                <div className=" card border-0 px-4 py-5">
                                    <h3>Profile</h3>
                                    <div className="row">
                                        <div className="col-6 px-3"> <label className="mb-1">
                                            <h6 className=" text-sm"><span className="profile-fields">Name</span>: {this.state.profileData.Student_Name}</h6>
                                        </label> </div>
                                        <div className="col-6 px-3"> <label className="mb-1">
                                            <h6 className=" text-sm"><span className="profile-fields">Email ID</span>: {this.state.profileData.Email_Address}</h6>
                                        </label> </div>
                                        <div className="col-6 px-3"> <label className="mb-1">
                                            <h6 className="text-sm"><span className="profile-fields">User ID</span>: {this.state.profileData.Student_id}</h6>
                                        </label> </div>
                                        <div className="col-6 px-3"> <label className="mb-1">
                                            <h6 className="text-sm"><span className="profile-fields">Mobile</span>: {this.state.profileData.Phone_Number}</h6>
                                        </label> </div>
                                        <div className="col-6 px-3"> <label className="mb-1">
                                            <h6 className="text-sm"><span className="profile-fields">School Name</span>: {this.state.profileData.School_Name}</h6>
                                        </label>
                                        </div>
                                        <div className="col-6 px-3"> <label className="mb-1">
                                            <h6 className="text-sm"><span className="profile-fields">Class</span>: {this.state.profileData.Class}</h6>
                                        </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Popup/>             */}
                </div>
            );
        }
        else if (this.state.flag == 4) {
            return (
                <div><h1 class="display-3">Registration is successful</h1>
                    <p class="lead"><strong>Name: {this.state.name}</strong> </p>
                </div>

            );
        }
        else if (this.state.flag == 3) {
            return (
                <App />
            );
        }
        else if (this.state.flag == 2) {
            let confirmation = {
                success: false,
                message: <div className="message-info">Something went wrong</div>,
                url: "./studentdashboard"
            }
            return (
                <ConfirmationMessage success={confirmation.success} message={confirmation.message} url={confirmation.url} />
            );
        }
        else {
            return (
                <LoadingAnimation />
            );
        }
    }
}
export default Profile;
