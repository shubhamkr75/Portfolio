import moment from 'moment';
import React, { Component } from 'react'
import ExamReport from './ExamReport';
import LogOut from './LogOut';
class TeacherDashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            examdata:false,
            examList:[],
            selectedExam:null,
            section:1,
        };
      }
      async fetchExams(){    //if exam is not rettrieved
        if(!this.state.examdata){
            await fetch(`http://localhost:5000/users/adminExams`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
                },
                body: 
                 JSON.stringify({
                    studentid: this.props.studentId,
                })
              })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({examList:data.recordset,examdata:true});                
                });
            }
    }
    
    async activateExam(examid,activattype){
        var res;
        this.setState({fetchedHistory:true});
        await fetch(`http://localhost:5000/users/activateExam`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: 
             JSON.stringify({
              examId: examid,
              activationType:activattype,
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
        {this.fetchExams()}  
        let index=0;     
        if(this.state.section==1&&this.state.examList.length!=0){
        return(
            <div>
                <LogOut/>
                <h3>Welcome to EXAM BABA</h3>
                <p>Below Exams are created by You</p>
                <h1>Dashboard</h1>
                <table id="examListTable" cellpadding="2" >
						<tbody><tr id="Tr1">
							<th id="Td1" class="user"> S.No</th>
							<th id="Td2"> Exam Name</th>
							<th id="Td3"> Class</th>
							<th id="Td4"> Creation Date</th>						
						</tr>
                {this.state.examList.map((list) => {
                    return(
                        <tr>
                        <td>                    
                            <span id="index">{index+1}</span>
                        </td>
                        <td>
                            <span id="examName">{list.ExamName}</span>
                        </td>
                        <td>
                            <span id="examStartTime">{list.class}</span>
                        </td>
                        <td>
                            <span id="examStartTime">{moment(Date(list.creationdate)).format('Do MMMM YYYY')}</span>
                        </td>
                        <td>
                        <input align="center" type="button" onClick={()=>this.setState({section:2,selectedExam:list.ExamId})} value="Report" id="ResponseDetails"/>    
                        </td>
                        <td>
                        <input align="center" type="button" onClick={()=>{list.active==0?this.activateExam(list.ExamId,"activate"):this.activateExam(list.ExamId,"deactivate")}} value={list.active==0?"Activate":"Deactivate"} id="ResponseDetails"/>    
                        </td>
                    </tr>
                    );
                })}
                </tbody></table>
            </div>
        );
        }
        else if(this.state.section==1&&this.state.examList.length==0){
            return(
            <div>No test created</div>
            );
        }
        else if(this.state.section==2){
            return(
                <ExamReport selectedExam={this.state.selectedExam}/>
            );
        }

    }
}
export default TeacherDashboard;