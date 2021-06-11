import React, { Component } from 'react'
import moment from 'moment'
import FetchResponse from './FetchResponse';
import LoadingAnimation from './LoadingAnimation';
import { Route } from 'react-router';
import ConfirmationMessage from './ConfirmationMessage';
class StudentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examHistoryList: [],
            section: 0,
            selectedExam: null,
            fetchedHistory: false,
        };
    }

    async fetchExamHistory() {
        var res;
        this.setState({ fetchedHistory: true });
        const token = sessionStorage.getItem('jwt');
        await fetch(`https://node-new.herokuapp.com/users/fetchExamHistory`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body:
                JSON.stringify({
                })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ examHistoryList: data.recordset, section: 1 });
            })
            .catch(err => {
                console.log(err);
                this.setState({ section: 404 });
            });
        return res;
    }
    render() {
        { !this.state.fetchedHistory && this.fetchExamHistory() }
        if (this.state.section == 1) {
            return (                
                <div className="examHistorySection">   
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
                                    <a href='/studentdashboard' className="dark submit-button">PREVIOUS</a>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className="examList-present row">
                        <div className="col-lg-12 row">

                            {this.state.examHistoryList.length>0 && this.state.examHistoryList.map((list, index) => {
                                return (
                                    <div className="col-md-4">
                                        <div className="test-section">
                                            <div className="test-name" >
                                                <h3 className="test-title">{list.ExamName}</h3>
                                            </div>
                                            <div className="test-details">
                                                <div className="test-marks">
                                                    <div className="marks">Marks</div>
                                                    <div className="mark-scored">
                                                        {list.Correct_answer != null ? list.Correct_answer : 0}
                                                    </div>
                                                </div>
                                                <div className="test-total-marks">
                                                    <div className="marks">Total marks</div>
                                                    <div className="mark-scored">
                                                        {list.TotalQuestions}
                                                    </div>
                                                </div>
                                                <div className="exam-date">
                                                    <div className="dates">Date</div>
                                                    <div className="date">
                                                    {moment(new Date(Number(list.ExamDate))).format('Do MMMM YYYY')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="start-button">
                                            <button type="button" className="submit-button"  onClick={() => this.setState({ section: 2, selectedExam: list.ExamId })} value="Check Response" id="ResponseDetails">Check Response</button>
                                            {/* <button type="button" onClick={() => this.setState({ selectedExam: list.ExamId })}  value="Check Response" id="ResponseDetails"><a href={"/Response/"}>Check Response</a></button> */}
                                        </div>
                                    </div>
                                );
                            })}
                            {this.state.examHistoryList.length==0 &&
                                <ConfirmationMessage success='neutral' message='No Examination To show' />    
                            }
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.section == 2) {
            return (
                <FetchResponse ExamId={this.state.selectedExam} studentId={this.props.studentId} />
            );
        }
        else if (this.state.flag == 404) {
            let confirmation={
                success:false,
                message: <div className="message-info">Something went wrong</div>,
                url:"./studentdashboard"
            }
            return (
                <ConfirmationMessage success={confirmation.success} message={confirmation.message} url={confirmation.url}/>    
            );
        }
        else {
            return (
                <LoadingAnimation />
            );
        }
    }
}
export default StudentDashboard;