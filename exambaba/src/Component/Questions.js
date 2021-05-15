import { render } from '@testing-library/react';
import React, { Component, useState } from 'react';
import update from 'react-addons-update';
import LoadingAnimation from './LoadingAnimation';
import LogOut from './LogOut';
import './Questions.css'
import StudentDashboard from './StudentDashboard';
import moment from 'moment';
class Questions extends Component {
    // const [questionList,setquestionList] = useState([]);   
    // const [checkdata, setCheckdata] = useState(false); 
    constructor() {
        super();
        this.state = {
            questionList: Array().fill(null),
            examList: Array().fill(null),
            checkdata: 0,
            examdata: false,
            examtime: null,
            showResult: false,
            answerList: Array().fill(null),
            marks: 0,
            ExamId: null,
        }
        this.toggleTab = this.toggleTab.bind(this);
    }

    // componentDidMount(){
    //     document.addEventListener("contextmenu", (event) => {
    //         event.preventDefault();
    //     });
    //     document.onkeydown((event)=> {
    //             if(event.keyCode == 123||event.keyCode == 116) {
    //                 return false;
    //             }
    //         }
    //     );
    // }

    async fetchQuestions(id, exam_time) {
        if (this.state.checkdata != 1) {     //if question is not rettrieved
            await fetch(`http://localhost:5000/users/questions/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    // setquestionList(data.Questions);
                    // setCheckdata(true);
                    this.setState({ questionList: data, checkdata: 1, examtime: exam_time, ExamId: id });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ checkdata: 404 });
                });
            this.createResponse();
        }
    }
    displayQuestions() {
        let counter = 0;
        return (
            <div class="questionList">
                {this.state.questionList.map((qlist) => {
                    counter++;
                    return (
                        <table class="questionSection" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tbody><tr>
                                <td class="bix-td-qno" rowspan="2" valign="top" align="left"><p>{counter}.&nbsp;</p></td>
                                <td class="bix-td-qtxt" valign="top"><p>{qlist.QuestionDesc}</p></td>
                            </tr>
                                <tr>
                                    <td valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id] == 1} Name={qlist.id} onClick={(e) => this.saveResponse(e, qlist.id, 1)} /></td><td class="bix-td-option" width="1%" id="tdOptionNo_A_434"><p id="lnkOptionLink_A_434" href="javascript: void 0;">A.</p></td>
                                        <td width="99%" >{qlist.Option1}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id] == 2} Name={qlist.id} onClick={(e) => this.saveResponse(e, qlist.id, 2)} /></td><td width="1%" ><p id="lnkOptionLink_B_434" href="javascript: void 0;">B.</p></td>
                                            <td width="99%" >{qlist.Option2}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id] == 3} Name={qlist.id} onClick={(e) => this.saveResponse(e, qlist.id, 3)} /></td><td width="1%" ><p id="lnkOptionLink_C_434" href="javascript: void 0;">C.</p></td>
                                            <td width="99%" >{qlist.Option3}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id] == 4} Name={qlist.id} onClick={(e) => this.saveResponse(e, qlist.id, 4)} /></td><td width="1%"><p id="lnkOptionLink_D_434" href="javascript: void 0;">D.</p></td>
                                            <td width="99%" >{qlist.Option4}</td></tr></tbody></table>
                                    </td>
                                </tr>
                            </tbody></table>
                    );
                })}
            </div>
        );
    }
    async fetchExams() {    //if exam is not rettrieved
        if (!this.state.examdata) {
            await fetch(`http://localhost:5000/users/exams`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body:
                    JSON.stringify({
                        schoolId: this.props.schoolId,
                        userClass: this.props.userClass,
                    })
            })
                .then((res) => res.json())
                .then((data) => {
                    // setquestionList(data.Questions);
                    // setCheckdata(true);
                    this.setState({ examList: data.recordset, checkdata: 4, examdata: true });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ checkdata: 404 });
                });
        }
    }
    async saveResponse(event, id, response) {
        if (event.target.checked) {
            if (this.state.answerList[id] === response) {
                await this.setState(update(this.state, {
                    answerList: {
                        [id]: {
                            $set: null
                        }
                    }
                }));
                event.target.checked = false;
            }
            else {
                await this.setState(update(this.state, {
                    answerList: {
                        [id]: {
                            $set: response
                        }
                    }
                }));
            }
        }
        let responseAnswer = JSON.stringify(this.state.answerList);
        fetch(`http://localhost:5000/users/saveResponse`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body:
                JSON.stringify({
                    examId: this.state.ExamId,
                    responseList: responseAnswer,
                    totalMarks: this.totalMarksCalculate(),
                    studentId: this.props.studentId,
                    // examTime: this.state.examTime,
                    //'file': this.uploadInput.files[0]
                })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
        // res.send("response saved"); 
    }
    async fetchResponse() {
        var res;
        await fetch(`http://localhost:5000/users/fetchResponse`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body:
                JSON.stringify({
                    examId: this.state.ExamId,
                    studentId: this.props.studentId,
                    // examTime: this.state.examTime,
                    //'file': this.uploadInput.files[0]
                })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                res = data.recordset.length;
                if ((data.recordset[0] != undefined || data.recordset[0] != null) && data.recordset[0].ResponseAnswer != null) {
                    this.setState({ answerList: JSON.parse(data.recordset[0].ResponseAnswer) }); //fetching saved response           
                    this.setTimer(data.recordset[0].StartTime);
                } else if (data.recordset[0] != undefined || data.recordset[0] != null) {
                    this.setTimer(data.recordset[0].StartTime);
                } else {
                    this.setTimer(Date.now());
                }
            });
        return res;
    }
    async createResponse() {
        let recordCount = await this.fetchResponse();
        if (recordCount == 0) {
            await fetch("http://localhost:5000/users/createResponse", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body:
                    JSON.stringify({
                        examId: this.state.ExamId,
                        totalQuestions: this.state.questionList.length,
                        startTime: Date.now(),
                        studentId: this.props.studentId,
                        // examTime: this.state.examTime,
                        //'file': this.uploadInput.files[0]
                    })
            }).then(response => {
                console.log(response);
            })
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err);

                });

        }
    }
    calculateMarks() {
        let marksCalculated = this.totalMarksCalculate();
        this.setState({ checkdata: 2, marks: marksCalculated });
    }
    totalMarksCalculate() {
        let marksCalculated = 0;
        for (let i = 0; i < this.state.questionList.length; i++) {
            if (this.state.questionList[i].answer == this.state.answerList[this.state.questionList[i].id]) {
                marksCalculated++;
            }
        }
        return marksCalculated;
    }
    setTimer = (timing) => {
        let startTime = timing;
        startTime = startTime + 1 * this.state.examtime * 60 * 1000;
        var x = setInterval(() => {
            var distance = startTime - Date.now();
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (document.getElementById("timeLeft"))
                document.getElementById("timeLeft").innerHTML = hours + ":"
                    + minutes + ":" + seconds;

            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                this.calculateMarks();
                this.setState({ checkdata: 3 });
            }
        }, 1000);
    }
    toggleTab(tab){
        if(tab==1){
            let navpresent=document.getElementsByClassName("examList-present");
            if(navpresent&&navpresent[0])
            navpresent[0].classList.remove("d-none");
            let navpast=document.getElementsByClassName("examHistorySection");
            if(navpast&&navpast[0])
            navpast[0].classList.add("d-none");
        }else{
            let navpresent=document.getElementsByClassName("examList-present");
            if(navpresent&&navpresent[0])
            navpresent[0].classList.add("d-none");
            let navpast=document.getElementsByClassName("examHistorySection");
            if(navpast&&navpast[0])
            navpast[0].classList.remove("d-none");
        }
    }

    // }
    render() {
        { this.fetchExams() }

        if (this.state.checkdata == 1) {       //if question is fetched     
            //this.setTimer();         
            return (
                <div class="bix-div-container">{this.displayQuestions()}
                    <div id="divSubmitTest" align="center">
                        <input align="center" onClick={() => this.calculateMarks()} type="button" value="Submit Test" id="btnSubmitTest" />
                        <div id="timeLeftDiv">
                            Time Left: <span id="timeLeft"></span>
                        </div>
                    </div>
                </div>
            );

        }
        else if (this.state.checkdata == 2) { //if test is submitted
            return (
                <div class="bix-div-container">
                    <h1 class="display-3">Thank You. Your Response has been Submitted</h1>
                    <p class="lead"><strong>Your Total Score is </strong>
                        <span id="result"> {this.state.marks}</span>/{this.state.questionList.length}</p>

                </div>
            );
        }
        else if (this.state.checkdata == 3) {       //if timeouts
            return (
                <div class="bix-div-container">
                    <h1 class="display-3">Times Up. Your Response has been Submitted</h1>
                    <p class="lead"><strong>Your Total Score is </strong>
                        <span id="result"> {this.state.marks}</span>/{this.state.questionList.length}</p>

                </div>
            );
        }
        else if (this.state.checkdata == 4||this.state.checkdata == 5) {
            let studentId = this.props.studentId;
            return (
                <div>
                    <h3 className="exam-dashboard-title">Welcome to Examination Dashboard</h3>
                    <div className="examlist-container ">
                        <div className="tabs">
                            <div className="live-tab" onClick={()=>this.toggleTab(1)}>
                                <div className="tab">
                                    <a className="dark">LIVE/UPCOMING <span className="challenges-count">13</span></a>
                                </div>
                            </div>
                            <div className="previous-tab" onClick={()=>this.toggleTab(2)}>
                                <div className="tab">
                                    <a className="dark">PREVIOUS</a>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
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
                                            <div className="test-date">
                                                    <div className="time">Starts At</div>
                                                    <div  className="start-date">
                                                    {moment(Date(list.createionDate)).format('Do MMMM YYYY')}
                                                    </div>
                                            </div>
                                            <div className="test-time">
                                                <div className="exam-time">Exam Time</div>
                                                <div  className="time">
                                                    {(list.Exam_Time)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="start-button">
                                    <button onClick={() => this.fetchQuestions(list.ExamId, list.Exam_Time)}>Start Now</button>
                                    </div>
                                </div> 
                                
                            
                        );
                    })}
                    </div>                               
                    </div>
                    {<StudentDashboard studentId={studentId} />}                    
                </div>
            );
        }
        else if (this.state.checkdata == 404) {
            return (
                <div>
                    <h1 class="display-3">
                        Something Went Wrong
                    </h1>
                </div>
            );
        }
        else {
            return (
                <LoadingAnimation />
            );
        }
    }
}
export default Questions;