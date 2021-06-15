import React, { Component } from 'react'
import ConfirmationMessage from './ConfirmationMessage';
import LoadingAnimation from './LoadingAnimation';
import Popup from './Popup';
class FetchAllUsers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            approvalList: [],
            section:1,
            selectedExam:null,
            fetchedHistory:false,
            selectedUser:null,
            userName:null
        };
      }
      componentDidMount(){
        this.fetchAllUsers();
      }
      async fetchAllUsers(){
        var res;
        this.setState({fetchedHistory:true});
        const token = sessionStorage.getItem('jwt')
        await fetch(`https://node-new.herokuapp.com/users/fetchAllUsers`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json",
              'Authorization': `Bearer ${token}`
            },
            body: 
             JSON.stringify({
              schoolid: this.props.schoolId,
            })
          })
        .then((res) => res.json())
        .then((data) => {           
           console.log(data); 
           this.setState({approvalList:data.recordset,section:1});
        })
        .catch(err => {
            console.log(err);
            this.setState({section:404}); 
        });
        return res;
    }
    async approveUser(userId,approvalType){
        var res;
        
        const token = sessionStorage.getItem('jwt')
        await fetch(`https://node-new.herokuapp.com/users/approveUser`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json",
              'Authorization': `Bearer ${token}`
            },
            body: 
             JSON.stringify({
              studentId: userId,
              approvalType:approvalType,
            })
          })
        .then((res) => res.json())
        .then((data) => {           
           console.log(data); 
           window.location.reload();
        });
        return res;
    }
    
    message(){
        return(
            <p>Are you sure you want to <strong>delete</strong> the user <strong> {this.state.userName} </strong>? Once deleted all the related records with <strong> {this.state.userName} </strong> will be deleted and the changes will not be reverted.</p>
        );
    }
    displayPopup(){
        if(document.getElementById("details-modal"))
        document.getElementById("details-modal").style.display="flex";
    }

    render(){
        if(this.state.section==1){
        return(
            <div className="examHistorySection">
                <h3 className="exam-dashboard-title">Users</h3>
                <table id="examListTable" className="js-sort-table js-sort-asc col-md-12" cellpadding="2" >
						<tbody><tr id="thead">
							<th id="Td1" className="user js-sort-active js-sort-number"> S.No</th>
							<th id="Td2" className="js-sort-active"> Student Name</th>
							<th id="Td3" className="js-sort-active"> Class</th>
							<th id="Td4" className="js-sort-active"> Email</th>	
                            <th id="Td4" className="js-sort-active"> Password</th>							
						</tr>
        
                {this.state.approvalList.map((list,index) => {
                return(
                        <tr id="tbody">
                        <td>                    
                            <span id="index">{index+1}</span>
                        </td>
                        <td>
                            <span id="examName">{list.Student_Name}</span>
                        </td>
                        <td>
                            <span id="marks">{list.Class}</span>
                        </td>
                        <td>
                            <span id="examStartTime">{list.Email_Address}</span>
                        </td>
                        <td>
                            <span id={'userPassword'+index} onClick={()=>document.getElementById('userPassword'+index).innerHTML!=list.UserPassword?document.getElementById('userPassword'+index).innerHTML=list.UserPassword:document.getElementById('userPassword'+index).innerHTML='Click to show'}>Click to show</span>
                        </td>
                        <td>
                        <input align="center" type="button" onClick={()=>{if(list.approved==0){this.approveUser(list.Student_id,"approve")}}} value={list.approved==0?"Approve":"Approved"} id="ResponseDetails"/>    
                        </td>
                        <td>
                        <input align="center" type="button" onClick={()=>{this.setState({selectedUser:list.Student_id,userName:list.Student_Name}); this.displayPopup()}} value="Delete" id="ResponseDetails"/>    
                        </td>
                        <td>
                        <input align="center" type="button" onClick={()=>this.approveUser(list.Student_id,"makeadmin")} value="Make Admin" id="ResponseDetails"/>    
                        </td>
                    </tr>
                );
            })}
            </tbody></table>
            <Popup function={this.approveUser} parameter={this.state.selectedUser} message={this.message()} title="Delete"/>
            </div>
        );
        }
        // else if(this.state.section==2){
        //     return(
        //         //<FetchResponse ExamId={this.state.selectedExam}/>
        //     );
        // }
        else if(this.state.approvalList.length==0&&this.state.section==1){
            return(
                <ConfirmationMessage success='neutral' message='No Results to show' />
            );
        }
        else if(this.state.section==404){
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
export default FetchAllUsers;