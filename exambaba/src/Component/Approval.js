import React, { Component } from 'react'
import ConfirmationMessage from './ConfirmationMessage';
import LoadingAnimation from './LoadingAnimation';
class Approval extends Component{
    constructor(props) {
        super(props);
        this.state = {
            approvalList: [],
            section:0,
            selectedExam:null,
            fetchedHistory:false,
        };
      }

      async fetchApprovals(){
        var res;
        this.setState({fetchedHistory:true});
        await fetch(`https://node-new.herokuapp.com/users/fetchApprovals`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
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
            this.setState({section:2}); 
        });
        return res;
    }
    async approveUser(userId,approvalType){
        var res;
        this.setState({fetchedHistory:true});
        await fetch(`https://node-new.herokuapp.com/users/approveUser`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
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
           this.setState({section:1});
           window.location.reload();
        });
        return res;
    }
      
    render(){
        {!this.state.fetchedHistory && this.fetchApprovals()} 
        if(this.state.approvalList.length!=0&&this.state.section==1){
        return(
            <div className="examHistorySection">
                <h3 className="exam-dashboard-title">Approvals</h3>
                <table id="examListTable" className="col-md-12" cellpadding="2" >
						<tbody><tr id="thead">
							<th id="Td1" class="user"> S.No</th>
							<th id="Td2"> Student Name</th>
							<th id="Td3"> Class</th>
							<th id="Td4"> Email</th>							
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
                        <input align="center" type="button" onClick={()=>this.approveUser(list.Student_id,"approve")} value="Approve" id="ResponseDetails"/>    
                        </td>
                        <td>
                        <input align="center" type="button" onClick={()=>this.approveUser(list.Student_id,"delete")} value="Delete" id="ResponseDetails"/>    
                        </td>
                        <td>
                        <input align="center" type="button" onClick={()=>this.approveUser(list.Student_id,"makeadmin")} value="Make Admin" id="ResponseDetails"/>    
                        </td>
                    </tr>
                );
            })}
            </tbody></table>
            </div>
        );
        }
        else if(this.state.approvalList.length==0&&this.state.section==1){
            return(
                <ConfirmationMessage success='neutral' message='No Approvals to show' />
            );
        }
        else if(this.state.section==2){
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
export default Approval;