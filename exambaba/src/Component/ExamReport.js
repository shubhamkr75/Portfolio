import moment from 'moment';
import React, { Component } from 'react'
import FetchResponse from './FetchResponse';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import LoadingAnimation from './LoadingAnimation';
import ConfirmationMessage from './ConfirmationMessage';
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
            await fetch(`https://node-new.herokuapp.com/users/fetchExamReport`, {
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
                })
                .catch(err => {
                    console.log(err);
                    this.setState({section:404}); 
                });
            }
    }

    saveAsPdf(){
        this.pdfExportComponent.save();
    }

    pdfData(){
        if(this.state.examReportList.length!=0&&this.state.section==1){
        let counter=1;
        return(
            <div className="examHistorySection pdf-section">
            <PDFExport  ref={(ref) => { this.pdfExportComponent = ref; }}  paperSize="A4">
                <h3 class="exam-dashboard-title align-center">Exam Report</h3>
                <h3 class="float-left pl-2">{this.props.examName}</h3>
                <h3 class="float-right pr-2">{moment(new Date(Number(this.props.examDate))).format('Do MMMM YYYY')} </h3>
                <table id="examListTable" className="col-md-12" cellpadding="2" >
						<tbody><tr id="thead">
							<th id="Td1" class="user"> Rank</th>
							<th id="Td2"> Name</th>
							<th id="Td3"> Marks</th>
							<th id="Td4"> Total Marks</th>						
						</tr>
        
                {this.state.examReportList.map((list,index) => {
                let prevMark=list.Correct_answer;
                if(index>0) prevMark=this.state.examReportList[index-1].Correct_answer;
                return(
                        <tr id="tbody-pdf">
                        <td>                    
                            <span id="index">{prevMark==list.Correct_answer?counter:++counter}</span>
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
                    </tr>
                );
            })}
            </tbody></table></PDFExport></div>
        );
        }
    }
      
    render(){  
        
        {!this.state.fetchedHistory && this.fetchExamReport()} 
        if(this.state.examReportList.length!=0&&this.state.section==1){
        let counter=1;
        return(
            <div className="examHistorySection">
                {/* <PDFExport  ref={(ref) => { this.pdfExportComponent = ref; }}  paperSize="A4"> */}
                {this.pdfData()}
                <h3 class="exam-dashboard-title align-center">Exam Report</h3>
                <h3 class="float-left">{this.props.examName}</h3>
                <h3 class="float-right">{moment(new Date(Number(this.props.examDate))).format('Do MMMM YYYY')} </h3>
                
                <table id="examListTable" className="col-md-12" cellpadding="2" >
						<tbody><tr id="thead">
							<th id="Td1" class="user"> Rank</th>
							<th id="Td2"> Student Name</th>
							<th id="Td3"> Marks</th>
							<th id="Td4"> Total Marks</th>
                            <th id="Td5"> Actions</th>						
						</tr>

                {this.state.examReportList.map((list,index) => {
                let prevMark=list.Correct_answer;
                if(index>0) prevMark=this.state.examReportList[index-1].Correct_answer;
                return(
                        <tr id="tbody">
                        <td>                    
                            <span id="index">{prevMark==list.Correct_answer?counter:++counter}</span>
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
            {/* </PDFExport> */}
            <div className="pdf-button">
                <button align="center" className="submit-button" type="button" onClick={()=>this.saveAsPdf()} value="Save As PDF" id="savepdf">Save as PDF</button>
            </div>
            </div>
        );
        }
        else if(this.state.section==2){
            return(
                <FetchResponse ExamId={this.props.selectedExam} studentId={this.state.selectedStudent}/>
            );
        }
        else if(this.state.examReportList.length==0&&this.state.section==1){
            return(
                <ConfirmationMessage success='neutral' message='No Response to show' />
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
export default ExamReport;