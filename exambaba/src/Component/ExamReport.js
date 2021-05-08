import moment from 'moment';
import React, { Component } from 'react'
import FetchResponse from './FetchResponse';
class ExamReport extends Component{
    constructor(props) {
        super(props);
        this.state = {
            examReportList: [],
            section:0,
            fetchedHistory:false,
            selectedStudent:null,
        };
      }
      async fetchExamReport(){    //if exam is not rettrieved
        if(!this.state.examdata){
            this.setState({fetchedHistory:true});
            await fetch(`http://localhost:5000/users/fetchExamReport`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
                },
                body: 
                 JSON.stringify({
                    selectedExam: this.props.selectedExam,
                })
              })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({examReportList:data.recordset,section:1});                
                });
            }
    }
      
    render(){  
        
        {!this.state.fetchedHistory && this.fetchExamReport()} 
        if(this.state.examReportList.length!=0&&this.state.section==1){
        return(
            <div className="examHistorySection">
                <h1>Dashboard</h1>
                <table id="examListTable" cellpadding="2" >
						<tbody><tr id="Tr1">
							<th id="Td1" class="user"> S.No</th>
							<th id="Td2"> Student Name</th>
							<th id="Td3"> Marks</th>
							<th id="Td4"> Total Marks</th>						
						</tr>
        
                {this.state.examReportList.map((list,index) => {
                return(
                        <tr>
                        <td>                    
                            <span id="index">{index+1}</span>
                        </td>
                        <td>
                            <span id="examName">{list.Student_Name}</span>
                        </td>
                        <td>
                            <span id="marks">{list.Correct_answer!=null?list.Correct_answer:0}</span>
                        </td>
                        <td>
                            <span id="examStartTime">{list.TotalQuestions}</span>
                        </td>
                        <td>
                        <input align="center" type="button" onClick={()=>this.setState({section:2,selectedStudent:list.Student_id})} value="Check Response" id="ResponseDetails"/>    
                        </td>
                    </tr>
                );
            })}
            </tbody></table>
            </div>
        );
        }
        else if(this.state.section==2){
            return(
                <FetchResponse ExamId={this.props.selectedExam} studentId={this.state.selectedStudent}/>
            );
        }
        else{
            return(
                <div>No Response to show</div>
            );
        }        

    }
}
export default ExamReport;