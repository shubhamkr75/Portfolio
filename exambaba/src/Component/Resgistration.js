import React, { Component } from 'react';
 
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
                document.getElementById("examCode").innerHTML = "Classes not available"
               }
               else{
                document.getElementById("examCode").innerHTML = "Invalid School Code";
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
        <div>
            <h1>Registration Form</h1>
        <form>
          <label> Name: 
            <input name="name" type="text" required onChange={this.handleInputChange} />
          </label>
          <br />
          <label> Email Id: 
            <input name="emailId" type="email" placeholder='abc@gmail.com' onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Mobile Number: 
            <input name="mobileNumber" type="tel" placeholder='1234567891' minLength='10'
              maxLength='10' pattern="[6-9]{1}[0-9]{9}" onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            School Code: 
            <input name="schoolCode" type="number" onChange={this.handleInputChange} onBlur={this.fetchClasses} />
          </label>
          <label id="examCode"></label>
          <br />
          <label> Class: 
              <select name="class" type="number" onChange={this.handleInputChange}>
              <option value=""></option>
                  {this.state.classesList.map((clist) => {
                      return(
                          <option value={clist}>{clist}</option>
                      );
                  })}
              </select>
          </label>
          <br />
          <label> Create Password: 
            <input name="userPassword" type="password" required onChange={this.handleInputChange}  />
          </label>
          <br />
          <label> Reenter Password: 
            <input name="repassword" type="password" required onBlur={this.checkPassword} />
          </label>
          <label id="matchPaasword"></label>
          <br />
          <input align="center" onClick={()=>this.createUser()} type="button" value="Register" id="submitUser"/>
        </form>
        <br/>
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
