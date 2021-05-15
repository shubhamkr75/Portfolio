import moment from 'moment';
import React, { Component } from 'react'
import ExamReport from './ExamReport';
import LogOut from './LogOut';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import LoadingAnimation from './LoadingAnimation';
class TeacherDashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            examdata:false,
            examList:[],
            selectedExam:null,
            section:0,
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
                    this.setState({examList:data.recordset,examdata:true,section:1});                
                })
                .catch(err => {
                    console.log(err);
                    this.setState({section:404}); 
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
           window.location.reload();
        });
        return res;
    }
    // saveAsPdf(){
    //     this.pdfExportComponent.save();
    // }
        

    render(){  
        {this.fetchExams()}  
        let index=0;     
        if(this.state.section==1&&this.state.examList.length!=0){
        return(
            <div>
                    <h3 className="exam-dashboard-title">Welcome to Examination Dashboard</h3>
                    <div className="examList-present row">
                    <div className="col-lg-9 row">
                    
                    {this.state.examList.map((list) => {
                        return (
                            <div className="col-md-4">
                                    <div className="test-section">
                                        <div className="test-name" >
                                            <span className="test-title">{list.ExamName}</span>
                                        </div>
                                        <div className="test-details">
                                            <div className="test-class">
                                                    <div className="classes">Class</div>
                                                    <div  className="class-text">
                                                        {list.class}
                                                    </div>
                                            </div>
                                            <div className="test-time">
                                                <div className="exam-time">Exam Time</div>
                                                <div  className="time">
                                                    {(list.Exam_Time)}
                                                </div>
                                            </div>
                                            <div className="test-creation">
                                                <div className="creation-date">Creation Date</div>
                                                <div  className="time">
                                                    {moment(Date(list.creationdate)).format('Do MMMM YYYY')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="start-button">
                                    {/* <input align="center" type="button" onClick={()=>this.setState({section:2,selectedExam:list.ExamId})} value="Report" id="ResponseDetails"/>   */}
                                    <button onClick={()=>this.setState({section:2,selectedExam:list.ExamId})} value="Report" id="ResponseDetails">Report</button>
                                    <button type="button" onClick={()=>{list.active==0?this.activateExam(list.ExamId,"activate"):this.activateExam(list.ExamId,"deactivate")}} value={list.active==0?"Activate":"Deactivate"} id="ResponseDetails">{list.active==0?"Activate":"Deactivate"}</button>
                                    </div>
                            </div>
                        );
                    })} 
                    </div> 
                    </div>                               
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
        else if(this.state.flag==404){
            return(
                <div>
                    <h1 class="display-3">
                        Something Went Wrong
                    </h1>
                </div>
            );
          }
          else{
              return(
                  <LoadingAnimation/>
              );
          }

    }
}
export default TeacherDashboard;