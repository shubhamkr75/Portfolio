import React, { Component } from 'react'
import moment from 'moment'
class StudentDashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            examHistoryList: [],
        };
      }

      async fetchExamHistory(){
        var res;
        await fetch(`http://localhost:5000/users/fetchExamHistory`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: 
             JSON.stringify({
              studentId: this.props.studentId,
              // examTime: this.state.examTime,
              //'file': this.uploadInput.files[0]
            })
          })
        .then((res) => res.json())
        .then((data) => {           
           console.log(data); 
           this.setState({examHistoryList:data.recordset});
        });
        return res;
    }
      
    render(){
        {this.state.examHistoryList.length==0 && this.fetchExamHistory()} 
        if(this.state.examHistoryList.length!=0){
        return(
            <div className="examHistorySection">
                <h1>Dashboard</h1>
                <table id="examListTable" cellpadding="2" >
						<tbody><tr id="Tr1">
							<th id="Td1" class="user"> S.No</th>
							<th id="Td2"> Exam Name</th>
							<th id="Td3"> Marks</th>
							<th id="Td4"> Total Marks</th>
							<th id="Th5"> Time</th>							
						</tr>
        
                {this.state.examHistoryList.map((list,index) => {
                return(
                        <tr>
                        <td>                    
                            <span id="index">{index+1}</span>
                        </td>
                        <td>
                            <span id="examName">{list.ExamName}</span>
                        </td>
                        <td>
                            <span id="marks">{list.Correct_answer!=null?list.Correct_answer:0}</span>
                        </td>
                        <td>
                            <span id="examStartTime">{list.TotalQuestions}</span>
                        </td>
                        <td>
                            <span id="examStartTime">{moment(Date(list.StartTime)).format('Do MMMM YYYY')}</span>
                        </td>
                        <td>
                        <input align="center" type="button" value="Check Response" id="ResponseDetails"/>    
                        </td>
                    </tr>
                );
            })}
            </tbody></table>
            </div>
        );
        }
        else{
            return(
                <div>Waiting/Cannot render data</div>
            );
        }
    }
}
export default StudentDashboard;