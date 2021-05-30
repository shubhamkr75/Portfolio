import moment from 'moment';
import React, { Component } from 'react'
import ExamReport from './ExamReport';
import LogOut from './LogOut';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import LoadingAnimation from './LoadingAnimation';
import ConfirmationMessage from './ConfirmationMessage';
import FetchResponse from './FetchResponse';
class TeacherDashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            examdata:false,
            examList:[],
            selectedExam:null,
            section:0,
            examName:null,
            examDate:null,
        };
      }
      async fetchExams(){    //if exam is not rettrieved
        this.setState({examdata:true})
        if(!this.state.examdata){
            await fetch(`https://node-new.herokuapp.com/users/adminExams`, {
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
        await fetch(`https://node-new.herokuapp.com/users/activateExam`, {
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
        (!this.state.examdata) && this.fetchExams()
        let index=0;     
        if(this.state.section==1&&this.state.examList.length!=0){
        return(
            <div>
                    <h3 className="exam-dashboard-title">Welcome to Examination Dashboard</h3>
                    <div className="examList-present row">
                    <div className="col-lg-12 row">
                    
                    {this.state.examList.map((list) => {
                        return (
                            <div className="col-md-4">
                                    <div className="test-section">
                                        <div className="test-name" >
                                            <h3 className="test-title">{list.ExamName}</h3>
                                        </div>
                                        <div className="test-details">
                                            <div className="test-class">
                                                    <div className="classes">Class</div>
                                                    <div  className="class-text">
                                                        {list.class}
                                                    </div>
                                            </div>
                                            <div className="test-time">
                                                <div className="exam-time">Total Time</div>
                                                <div  className="time">
                                                    {(list.Exam_Time)} mins
                                                </div>
                                            </div>
                                            <div className="test-examdate">
                                                <div className="test-examdate">Exam Date</div>
                                                <div  className="time">
                                                    {moment(new Date(Number(list.ExamDate))).format('Do MMMM YYYY')}
                                                </div>
                                            </div>
                                            <div className="test-examdate">
                                                <div className="test-examdate">Exam Time</div>
                                                <div  className="time">
                                                    {moment(new Date(Number(list.ExamDate))).format('HH:mm')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="start-button">
                                    {/* <input align="center" type="button" onClick={()=>this.setState({section:2,selectedExam:list.ExamId})} value="Report" id="ResponseDetails"/>   */}
                                    <div className="action-button">
                                        <button className="submit-button" onClick={()=>this.setState({section:2,selectedExam:list.ExamId,examName:list.ExamName,examDate:list.ExamDate})} value="Report" id="ResponseDetails">Report</button>
                                        <button className={list.active==0?'error-background submit-button':'success-background submit-button'} type="button" onClick={()=>{list.active==0?this.activateExam(list.ExamId,"activate"):this.activateExam(list.ExamId,"deactivate")}} value={list.active==0?"Deactive":"Active"} id="ResponseDetails">{list.active==0?"Deactive":"Active"}</button>
                                    </div>     
                                    <br/>                               
                                    <div className="action-button">
                                    <button className="submit-button" onClick={()=>this.setState({section:3,selectedExam:list.ExamId})} value="Report" id="ResponseDetails">Preview</button>
                                    <button className="submit-button" value="Report" id="ResponseDetails">Delete</button>
                                    
                                    </div>
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
            <ConfirmationMessage success='neutral' message='No Examination To show' />
            );
        }
        else if(this.state.section==2){
            return(
                <ExamReport selectedExam={this.state.selectedExam} examName={this.state.examName} examDate={this.state.examDate}/>
            );
        }
        else if(this.state.section==3){
            return(
                <FetchResponse ExamId={this.state.selectedExam}/>
            );
        }
        else if(this.state.flag==404){
            let confirmation={
                success:false,
                message: <div className="message-info">Unable to fetch records</div>,
                url:"./registration"
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
export default TeacherDashboard;