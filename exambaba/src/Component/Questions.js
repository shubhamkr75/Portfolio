import { render } from '@testing-library/react';
import React, { Component, useState } from 'react';
import update from 'react-addons-update';
import LoadingAnimation from './LoadingAnimation';
import LogOut from './LogOut';
import './Questions.css'
import StudentDashboard from './StudentDashboard';
import moment from 'moment';
import ConfirmationMessage from './ConfirmationMessage';
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
            questionPointer: 1,
        }
        this.displayQuestions = this.displayQuestions.bind(this);
        this.questionStatus = this.questionStatus.bind(this);
    }

    componentDidMount() {
        document.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
        document.addEventListener("copy", function (evt) {
            evt.clipboardData.setData("text/plain", "Copying is not allowed on this webpage");
            evt.preventDefault();
        }, false);
    }

    async testCountdown(id, exam_time, startTime){
        await this.setExamData(id, exam_time);       
        this.setTimer(startTime,'startTimeLeft',exam_time);
    }
    async setExamData(id, exam_time){
        this.setState({checkdata:6, examtime: exam_time, ExamId: id });
    }

    async fetchQuestions(id, exam_time) {
        if (this.state.checkdata != 1) {     //if question is not rettrieved
            await fetch("https://node-new.herokuapp.com/users/questions",{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body:
                    JSON.stringify({
                        ExamId: id,
                    })
            })
                .then((res) => res.json())
                .then((data) => {
                    // setquestionList(data.Questions);
                    // setCheckdata(true);
                    this.setState({ questionList: data, checkdata: 1,examtime: exam_time, ExamId: id});
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ checkdata: 404 });
                });
            this.createResponse();
        }
    }
    displayQuestions() {
        var element = document.documentElement;
        if (!element.fullscreenElement) {
            element.requestFullscreen()
                .then(function () {
                })
                .catch(function (error) {
                });
        }
        let qlist = this.state.questionList[this.state.questionPointer - 1];
        return (
            <div class="questionList">
                <div>
                    <div class="questionDesc">Que<span class="hidden-xs">stion</span> No. {this.state.questionPointer}</div>
                    <table class="questionSection" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tbody><tr>
                            <td valign="top"><p>{qlist.QuestionDesc}</p></td>
                        </tr>
                            <tr className="optionSection">
                                <td className="select-option" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id] == 1} Name={qlist.id} onClick={(e) => this.saveResponse(e, qlist.id, 1)} /></td>
                                    <td class="optionDesc" width="99%" >{qlist.Option1}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id] == 2} Name={qlist.id} onClick={(e) => this.saveResponse(e, qlist.id, 2)} /></td>
                                        <td class="optionDesc" width="99%" >{qlist.Option2}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id] == 3} Name={qlist.id} onClick={(e) => this.saveResponse(e, qlist.id, 3)} /></td>
                                        <td class="optionDesc" width="99%" >{qlist.Option3}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id] == 4} Name={qlist.id} onClick={(e) => this.saveResponse(e, qlist.id, 4)} /></td>
                                        <td class="optionDesc" width="99%" >{qlist.Option4}</td></tr></tbody></table>
                                </td>
                            </tr>
                        </tbody></table></div>
                <div class="navigation-button">
                    <div class="navigate">
                        <button type="button" className={ this.state.questionPointer > 1 ? "float-left test-button":"d-none"} onClick={() => { this.state.questionPointer > 1 ? this.setState({ questionPointer: this.state.questionPointer - 1 }) : this.setState({ questionPointer: this.state.questionPointer }) }}>Previous</button>
                        <button type="button" className={this.state.questionPointer < this.state.questionList.length?"float-right test-button button-next":'d-none'} onClick={() => { this.state.questionPointer < this.state.questionList.length ? this.setState({ questionPointer: this.state.questionPointer + 1 }) : this.setState({ questionPointer: this.state.questionPointer }) }} >Next</button>
                    </div>
                </div>
            </div>
        );
    }

    questionStatus() {
        return (
            <div className="status-section">
                <div id="divSubmitTest" align="center">
                    <div id="timeLeftDiv">
                        Time Left: <span id="timeLeft"></span>
                    </div>
                    <input class="test-button" align="center" onClick={() => this.calculateMarks()} type="button" value="Submit Test" id="btnSubmitTest" />
                </div>
                <div className="status-content">
                    <div className="status-available">
                        <div class="col-xs-4 float-left">
                            <span class="answered states">0</span>
                            <span class="marker"><span>Answered&nbsp;</span></span></div>
                        <div class="col-xs-4 ">
                            <span class="not-answered states">0</span>
                            <span class="marker"><span>Not Answered</span></span></div>
                    </div>
                </div>
                <div className="numbering">
                    <ul className="qnumbering">
                        {(() => {
                            const list = [];
                            for (let i = 1; i <= this.state.questionList.length; i++) {
                                list.push(<li onClick={() => this.setState({ questionPointer: i })} id={'q' + i} class={this.state.answerList[i] ? "answered" : "not-answered"} value={i}>{i}</li>);
                            }
                            return list;
                        })()}
                    </ul>
                </div>
            </div>
        );
    }


    async fetchExams() {    //if exam is not rettrieved
        this.setState({ examdata: true })
        if (!this.state.examdata) {
            await fetch(`https://node-new.herokuapp.com/users/exams`, {
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
            let elem = document.getElementById("q" + id);
            if (this.state.answerList[id] === response) {
                await this.setState(update(this.state, {
                    answerList: {
                        [id]: {
                            $set: null
                        }
                    }
                }));
                event.target.checked = false;
                if (elem)
                    document.getElementById("q" + id).classList.add("not-answered");
            }
            else {
                await this.setState(update(this.state, {
                    answerList: {
                        [id]: {
                            $set: response
                        }
                    }
                }));
                if (elem)
                    document.getElementById("q" + id).classList.add("answered");
            }
        }
        let responseAnswer = JSON.stringify(this.state.answerList);
        fetch(`https://node-new.herokuapp.com/users/saveResponse`, {
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
        await fetch(`https://node-new.herokuapp.com/users/fetchResponse`, {
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
                if( (data.recordset[0] != undefined && data.recordset[0] != null) && data.recordset[0].submitted && data.recordset[0].submitted==1){
                    this.setState({checkdata:7});
                }
                if ((data.recordset[0] != undefined && data.recordset[0] != null) && data.recordset[0].ResponseAnswer != null) {
                    this.setState({ answerList: JSON.parse(data.recordset[0].ResponseAnswer) }); //fetching saved response  
                    // this.setTimer(Number(data.recordset[0].StartTime)+1 * this.state.examtime * 60 * 1000,'timeLeft');
                } else if (data.recordset[0] != undefined || data.recordset[0] != null) {
                    // this.setTimer(Number(data.recordset[0].StartTime)+1 * this.state.examtime * 60 * 1000,'timeLeft');
                } 
            });
        return res;
    }
    async createResponse() {
        // let recordCount = await this.fetchResponse();
        if (true) {
            await fetch("https://node-new.herokuapp.com/users/createResponse", {
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
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                               
                if( (data.recordset[0] != undefined && data.recordset[0] != null) && data.recordset[0].submitted && data.recordset[0].submitted==1){
                    this.setState({checkdata:7});
                }
                if ((data.recordset[0] != undefined && data.recordset[0] != null) && data.recordset[0].ResponseAnswer != null) {
                    this.setState({ answerList: JSON.parse(data.recordset[0].ResponseAnswer) }); //fetching saved response  
                    // this.setTimer(Number(data.recordset[0].StartTime)+1 * this.state.examtime * 60 * 1000,'timeLeft');
                } else if (data.recordset[0] != undefined || data.recordset[0] != null) {
                    // this.setTimer(Number(data.recordset[0].StartTime)+1 * this.state.examtime * 60 * 1000,'timeLeft');
                } 
            })
                .catch(err => {
                    console.log(err);

                });
            // this.fetchResponse();

        }
    }
    calculateMarks() {
        let marksCalculated = this.totalMarksCalculate();
        fetch("https://node-new.herokuapp.com/users/submitTest", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body:
                    JSON.stringify({
                        examId: this.state.ExamId,
                        studentId: this.props.studentId,
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
        this.setState({ checkdata: 2, marks: marksCalculated });
    }
    totalMarksCalculate() {
        let marksCalculated = 0;
        for (let i = 0; i < this.state.questionList.length; i++) {
            if ((this.state.questionList[i].identity / 54 - i - 1 - this.state.questionList[i].QuestionDesc.length) == this.state.answerList[this.state.questionList[i].id]) {
                marksCalculated++;
            }
        }
        return marksCalculated;
    }
    setTimer = (timing,divid,exam_time) => {
        let startTime = timing;
        // startTime = startTime + 1 * this.state.examtime * 60 * 1000;
        var x = setInterval(() => {
            var distance = startTime - Date.now();
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (document.getElementById(divid))
                document.getElementById(divid).innerHTML = hours + ":"
                    + minutes + ":" + seconds;

            // If the count down is over, write some text 
            if (distance < 0&&this.state.checkdata==1&&divid=='timeLeft') {
                clearInterval(x);
                this.calculateMarks();
                this.setState({ checkdata: 3 });
            }
            else if(distance<=0&&this.state.checkdata==6&&divid=='startTimeLeft'){
                this.setTimer(timing+60000*exam_time,'timeLeft');
                this.fetchQuestions(this.state.ExamId,this.state.examtime);                
            }
        }, 1000);
    }
    // }
    render() {
        { (!this.state.examdata) && this.fetchExams() }

        if (this.state.checkdata == 1) {       //if question is fetched     
            //this.setTimer();         
            return (
                <div class="exam-page">{this.displayQuestions()}
                    {this.questionStatus()}
                </div>
            );

        }
        else if (this.state.checkdata == 2) { //if test is submitted
            let confirmation = {
                success: true,
                message: <div className="message-info"><h3>Thank You. Your Response has been Submitted</h3>
                    {/* <p class="lead"><strong>Your Total Score is </strong>
                        <span id="result"> {this.state.marks}</span>/{this.state.questionList.length}</p> */}
                </div>,
                url: "./studentdashboard"
            }
            return (
                <ConfirmationMessage success={confirmation.success} message={confirmation.message} url={confirmation.url} />
            );
        }
        else if (this.state.checkdata == 3) {       //if timeouts
            let confirmation = {
                success: true,
                message: <div className="message-info"><h3>Times Up. Your Response has been Submitted</h3>
                    <p class="lead"><strong>Your Total Score is </strong>
                        {/* <span id="result"> {this.state.marks}</span>/{this.state.questionList.length} */}
                        </p></div>,
                url: "./studentdashboard"
            }
            return (
                <ConfirmationMessage success={confirmation.success} message={confirmation.message} url={confirmation.url} />
            );
        }
        else if (this.state.checkdata == 4 || this.state.checkdata == 5) {
            let studentId = this.props.studentId;
            return (
                <div>
                    <h3 className="exam-dashboard-title">Welcome to Examination Dashboard</h3>
                    <div className="examlist-container ">
                        <div className="tabs">
                            <div className="live-tab">
                                <div className="tab">
                                    <a href='/exams' className="dark">LIVE/UPCOMING</a>
                                </div>
                            </div>
                            <div className="previous-tab" >
                                <div className="tab">
                                    <a href='/studentdashboard' className="dark">PREVIOUS</a>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className="examList-present row">
                        <div className="col-lg-12 row">
                            {this.state.examList.length > 0 && this.state.examList.map((list) => {
                                return (
                                    <div className="col-md-4">
                                        <div className="test-section">
                                            <div className="test-name" >
                                                <h3 className="test-title">{list.ExamName}</h3>
                                            </div>
                                            <div className="test-details">
                                                <div className="test-time">
                                                    <div className="exam-time">Total Time</div>
                                                    <p className="time">
                                                        {(list.Exam_Time)} mins
                                                </p>
                                                </div>
                                                <div className="test-examdate">
                                                    <div className="test-examdate">Exam Date</div>
                                                    <div className="time">
                                                        {moment(new Date(Number(list.ExamDate))).format('Do MMMM YYYY')}
                                                    </div>
                                                </div>
                                                <div className="test-examdate">
                                                    <div className="test-examdate">Exam Time</div>
                                                    <div className="time">
                                                        {moment(new Date(Number(list.ExamDate))).format('HH:mm')}
                                                    </div>
                                                </div>
                                                {/* {this.setTimer(Number(list.ExamDate)+list.Exam_Time*60000)} */}
                                                
                                            </div>
                                            {/* <div id="timeLeftDiv">
                                                    Time Left: <span id="timeLeft"></span>
                                            </div> */}
                                        </div>
                                        
                                        <div className="start-button">
                                            <button className="submit-button" onClick={() => this.testCountdown(list.ExamId,list.Exam_Time, Number(list.ExamDate))}>Start Now</button>
                                            {/* <button className="submit-button" onClick={() => this.fetchQuestions(list.ExamId, list.Exam_Time)}>Start Now</button> */}
                                        </div>
                                    </div>


                                );
                            })}
                            {this.state.examList.length == 0 &&
                                <ConfirmationMessage success='neutral' message='No Examination To show' />
                            }
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.state.checkdata == 6){
            let confirmation = {
                success: 'neutral',
                message: <div><div>Your test willautomatically start in</div><div id="timeLeftDiv">
                            Time Left: <div id="startTimeLeft"></div>
                        </div></div>,
                url: ""
            }
            return (
                <ConfirmationMessage success={confirmation.success} message={confirmation.message} url={confirmation.url} />
            );
        }
        else if(this.state.checkdata == 7){
            let confirmation = {
                success: 'neutral',
                message: <div>You have already Submitted the Test</div>,
                url: "/studentdashboard"
            }
            return (
                <ConfirmationMessage success={confirmation.success} message={confirmation.message} url={confirmation.url} />
            );
        }
        else if (this.state.checkdata == 404) {
            let confirmation = {
                success: false,
                message: <div className="message-info">Something went wrong</div>,
                url: "./studentdashboard"
            }
            return (
                <ConfirmationMessage success={confirmation.success} message={confirmation.message} url={confirmation.url} />
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