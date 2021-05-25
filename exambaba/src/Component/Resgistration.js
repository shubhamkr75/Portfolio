import React, { Component } from 'react';
import App from '../App';
import LoadingAnimation from './LoadingAnimation';
import examlogo from '../Assets/image/examination.png';
import ConfirmationMessage from './ConfirmationMessage';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            emailId: "",
            mobileNumber: "",
            schoolCode: "",
            class: "",
            classesList: [],
            flag: 0,
            userPassword: "",
            sid: "",
            invalid: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.fetchClasses = this.fetchClasses.bind(this);
        this.fetchEmail = this.fetchEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.createUser = this.createUser.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    fetchClasses() {
        fetch(`https://node-new.herokuapp.com/users/fetchClasses`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body:
                JSON.stringify({
                    schoolId: this.state.schoolCode,
                })
        })
            .then((res) => res.json())
            .then((data) => {
                if ((data.recordset[0] != undefined || data.recordset[0] != null) && data.recordset[0].classes != null) {
                    this.setState({ classesList: JSON.parse(data.recordset[0].classes) });
                    document.getElementById("examCode").innerHTML = "";
                }
                else if ((data.recordset[0] != undefined || data.recordset[0] != null) && data.recordset[0].classes == null) {
                    document.getElementById("examCode").innerHTML = "Classes not available";
                    this.setState({ classesList: [] });
                }
                else {
                    document.getElementById("examCode").innerHTML = "Invalid School Code";
                    this.setState({ classesList: [] });
                }
            });
    }
    fetchEmail() {
        fetch(`https://node-new.herokuapp.com/users/fetchEmail`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body:
                JSON.stringify({
                    emailId: this.state.emailId,
                })
        })
            .then((res) => res.json())
            .then((data) => {
                if ((data.recordset[0] != undefined && data.recordset[0] != null)) {
                    document.getElementById("emailCheck").innerHTML = "Email ID '" + this.state.emailId + "' is already Taken";
                    document.getElementById("emailId").value = "";
                }
                else {
                    document.getElementById("emailCheck").innerHTML = "";
                }
            });
    }

    checkPassword(event) {
        if (this.state.userPassword != event.target.value) {
            document.getElementById("matchPaasword").innerHTML = "Password does not match";
            document.getElementById("confirmpassword").value = "";
        }
        else {
            document.getElementById("matchPaasword").innerHTML = "";
            return true;
        }
    }
    // user registration
    createUser(event) {
        event.preventDefault();
        fetch(`https://node-new.herokuapp.com/users/createUser`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body:
                JSON.stringify({
                    name: this.state.name,
                    emailId: this.state.emailId,
                    mobileNumber: this.state.mobileNumber,
                    schoolCode: this.state.schoolCode,
                    selectedClass: this.state.class,
                    userPassword: this.state.userPassword,
                })
        })
            .then((res) => res.json())
            .then((data) => {
                if(data!=undefined||data!='null'||data)
                this.setState({ flag: 1, sid: data });
                else
                this.setState({ flag: 2 });
            })
            .catch(err => {
                console.log(err);
                this.setState({ flag: 2 });
            });
    }
    //
    render() {
        if (this.state.flag == 0) {
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
                                    <form onSubmit={this.createUser}>
                                        <div className="row px-3"> <label className="mb-1">
                                            <h6 className="mb-0 text-sm input-text">Name<span className="asterik"> *</span></h6>
                                        </label> <input name="name" className="input-field" type="text" required onChange={this.handleInputChange} /> </div>
                                        <div className="row px-3"> <label className="mb-1">
                                            <h6 className="mb-0 text-sm input-text">Email ID<span className="asterik"> *</span></h6>
                                        </label> <input name="emailId" className="input-field" id="emailId" type="email" required placeholder='abc@gmail.com' onChange={this.handleInputChange} onBlur={this.fetchEmail} /> </div>
                                        <label className="asterik" id="emailCheck"></label>
                                        <div className="row px-3"> <label className="mb-1">
                                            <h6 className="mb-0 text-sm input-text">Mobile Number<span className="asterik"> *</span></h6>
                                        </label> <input name="mobileNumber" className="input-field" type="tel" required placeholder='1234567891' minLength='10' maxLength='10' pattern="[6-9]{1}[0-9]{9}" onChange={this.handleInputChange} />
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="row px-3"> <label className="mb-1">
                                                    <h6 className="mb-0 text-sm input-text">School Code<span className="asterik"> *</span></h6>
                                                </label> <input name="schoolCode" className="input-field" type="text" required onChange={this.handleInputChange} onBlur={this.fetchClasses} />
                                                    <label className="asterik" id="examCode"></label>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row px-3"> <label className="mb-1">
                                                    <h6 className="mb-0 text-sm input-text">Class<span className="asterik"> *</span></h6>
                                                </label>
                                                    <select name="class" type="number" required onChange={this.handleInputChange}>
                                                        <option value=""></option>
                                                        {this.state.classesList.map((clist) => {
                                                            return (
                                                                <option value={clist}>{clist}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="row px-3"> <label className="mb-1">
                                                    <h6 className="mb-0 text-sm input-text">Password<span className="asterik"> *</span></h6>
                                                </label> <input name="userPassword" minLength="6" className="input-field" type="password" placeholder="Password" required onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row px-3"> <label className="mb-1">
                                                    <h6 className="mb-0 text-sm input-text">Confirm password<span className="asterik"> *</span></h6>
                                                </label> <input name="repassword" className="input-field" id="confirmpassword" placeholder="Confirm" type="password" required onBlur={this.checkPassword} />
                                                    <label className="asterik" id="matchPaasword"></label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3 mt-3 px-3"> <button type="submit" className="submit-button" value="Register" id="submitUser">Register</button> </div>
                                    </form>
                                    <div className="row mb-4 px-3"> <small className="font-weight-bold">Already have an account? <a className="text-danger" href="/">Login</a></small> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.flag == 1) {
            let confirmation={
                success:true,
                message: <div className="message-info"> <p class="lead"><strong>Name: {this.state.name}</strong> </p>
                <p class="lead"><strong>ID: {this.state.sid}</strong> </p>
                <p class="lead"><strong>Note:- Please take note of the SID for further login</strong> </p></div>,
                url:"./"}
            return (
                <ConfirmationMessage success={confirmation.success} message={confirmation.message} url={confirmation.url}/>
            );
        }
        else if (this.state.flag == 2) {
                let confirmation={
                    success:false,
                    message: <div className="message-info">Could not create the acount</div>,
                    url:"./registration"
                }
                return (
                    <ConfirmationMessage success={confirmation.success} message={confirmation.message} url={confirmation.url}/>    
                );
        }
        else {
            <LoadingAnimation />
        }
    }
}
export default Registration;
