import React, { Component } from 'react';
import App from '../App';
import Login from './Login';
 
class Registration extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          emailId: "",
          mobileNumber: "",
          schoolCode: "",
          class: "",
          classesList: [],
          flag:0,
          userPassword:"",
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fetchClasses = this.fetchClasses.bind(this);  
        this.checkPassword = this.checkPassword.bind(this);    
      }
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }    

      fetchClasses(){
        fetch(`http://localhost:5000/users/fetchClasses`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: 
             JSON.stringify({
                 schoolId:this.state.schoolCode,
            })
          })
        .then((res) => res.json())
        .then((data) => {    
               if((data.recordset[0]!=undefined||data.recordset[0]!=null)&&data.recordset[0].classes!=null)       
               {this.setState({classesList:JSON.parse(data.recordset[0].classes)}); 
               document.getElementById("examCode").innerHTML = ""
                }
               else if((data.recordset[0]!=undefined||data.recordset[0]!=null)&&data.recordset[0].classes==null){
                document.getElementById("examCode").innerHTML = "Classes not available";
                this.setState({classesList:[]});
               }
               else{
                document.getElementById("examCode").innerHTML = "Invalid School Code";
                this.setState({classesList:[]});
               }     
        });
      }
      checkPassword(event){
        if(this.state.userPassword!=event.target.value){
            document.getElementById("matchPaasword").innerHTML = "Password does not match";
        }
        else{
            document.getElementById("matchPaasword").innerHTML = "";
        }
      }
// user registration
      createUser(){
        fetch(`http://localhost:5000/users/createUser`, {
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
           console.log(data); 
           this.setState({flag:1});             
        })
        .catch(err => {
            console.log(err);
            this.setState({flag:2}); 
        });
      }
 
render(){
    if(this.state.flag==0){
    return(
        // <div>
        //     <h1>Registration Form</h1>
        // <form>
        //   <label> Name: 
        //     <input name="name" type="text" required onChange={this.handleInputChange} />
        //   </label>
        //   <br />
        //   <label> Email Id: 
        //     <input name="emailId" type="email" placeholder='abc@gmail.com' onChange={this.handleInputChange} />
        //   </label>
        //   <br />
        //   <label>
        //     Mobile Number: 
        //     <input name="mobileNumber" type="tel" placeholder='1234567891' minLength='10'
        //       maxLength='10' pattern="[6-9]{1}[0-9]{9}" onChange={this.handleInputChange} />
        //   </label>
        //   <br />
        //   <label>
        //     School Code: 
        //     <input name="schoolCode" type="number" onChange={this.handleInputChange} onBlur={this.fetchClasses} />
        //   </label>
        //   <label id="examCode"></label>
        //   <br />
        //   <label> Class: 
        //       <select name="class" type="number" onChange={this.handleInputChange}>
        //       <option value=""></option>
        //           {this.state.classesList.map((clist) => {
        //               return(
        //                   <option value={clist}>{clist}</option>
        //               );
        //           })}
        //       </select>
        //   </label>
        //   <br />
        //   <label> Create Password: 
        //     <input name="userPassword" type="password" required onChange={this.handleInputChange}  />
        //   </label>
        //   <br />
        //   <label> Reenter Password: 
        //     <input name="repassword" type="password" required onBlur={this.checkPassword} />
        //   </label>
        //   <label id="matchPaasword"></label>
        //   <br />
        //   <input align="center" onClick={()=>this.createUser()} type="button" value="Register" id="submitUser"/>
        // </form>
        // <br/>
        // </div>

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
                                    <h6 className="mb-0 text-sm">Name</h6>
                                </label> <input name="name" type="text" required onChange={this.handleInputChange} /> </div>
                            <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Email ID</h6>
                                </label> <input name="emailId" type="email" placeholder='abc@gmail.com' onChange={this.handleInputChange} /> </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Mobile Number</h6>
                                </label> <input name="mobileNumber" type="tel" placeholder='1234567891' minLength='10' maxLength='10' pattern="[6-9]{1}[0-9]{9}" onChange={this.handleInputChange} /> 
                            </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">School Code</h6>
                                </label> <input name="schoolCode" type="number" onChange={this.handleInputChange} onBlur={this.fetchClasses} /> 
                                <label id="examCode"></label>
                            </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Class</h6>
                                </label> 
                                <select name="class" type="number" onChange={this.handleInputChange}>
                                  <option value=""></option>
                                      {this.state.classesList.map((clist) => {
                                          return(
                                              <option value={clist}>{clist}</option>
                                          );
                                      })}
                                </select> 
                            </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Password</h6>
                                </label> <input name="userPassword" type="password" placeholder="Password" required onChange={this.handleInputChange}  /> 
                            </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Confirm password</h6>
                                </label> <input name="repassword" placeholder="Confirm" type="password" required onBlur={this.checkPassword} />
                                <label id="matchPaasword"></label>
                            </div>

                            <div className="row px-3 mb-4">
                                <div className="custom-control custom-checkbox custom-control-inline"> <input id="chk1" type="checkbox" name="chk" class="custom-control-input" /> <label for="chk1" class="custom-control-label text-sm"> Remember me</label> </div> <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a>
                            </div>
                            <div className="row mb-3 px-3"> <button onClick={()=>this.createUser()} type="submit" value="Register"  id="submitUser">Register</button> </div>
                        </div>
                    </div>
                </div>
                <div className="bg-blue py-4">
                    <div className="row px-3"> <small className="ml-4 ml-sm-5 mb-2">Copyright &copy; 2021. All rights reserved.</small>
                        <div className="social-contact ml-4 ml-sm-auto"> <span className="fa fa-facebook mr-4 text-sm"></span> <span className="fa fa-google-plus mr-4 text-sm"></span> <span className="fa fa-linkedin mr-4 text-sm"></span> <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span> </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }
    else if(this.state.flag==1){
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
    else{
        return(
            <div>
                <h1 class="display-3">
                    Something Went Wrong
                </h1>
            </div>
            
        );
    }
}
}
export default Registration;
