import React, { Component } from 'react'
import moment from 'moment'
import FetchResponse from './FetchResponse';
import LoadingAnimation from './LoadingAnimation';
import { Route } from 'react-router';
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
        await fetch(`http://localhost:5000/users/fetchExamHistory`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body:
                JSON.stringify({
                    studentId: this.props.studentId,
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
        if (this.state.examHistoryList.length != 0 && this.state.section == 1) {
            return (                
                <div className="examHistorySection d-none">                    
                    <div className="examList-past row">
                        <div className="col-lg-9 row">

                            {this.state.examHistoryList.map((list, index) => {
                                return (
                                    <div className="col-md-4">
                                        <div className="test-section">
                                            <div className="test-name" >
                                                <span className="test-title">{list.ExamName}</span>
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
                                                        {moment(Date(list.StartTime)).format('Do MMMM YYYY')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="start-button">
                                            <button type="button" onClick={() => this.setState({ section: 2, selectedExam: list.ExamId })} value="Check Response" id="ResponseDetails">Check Response</button>
                                            {/* <button type="button" onClick={() => this.setState({ selectedExam: list.ExamId })}  value="Check Response" id="ResponseDetails"><a href={"/Response/"}>Check Response</a></button> */}
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.section == 2) {
            return (
                
            // <Route path="/Response/:responseid">
            //     <Questions schoolId={token.School_id} userClass={token.Class} studentId={token.Student_id}/>
            // </Route>
                <FetchResponse ExamId={this.state.selectedExam} studentId={this.props.studentId} />
            );
        }
        else if (this.state.examHistoryList.length == 0 && this.state.section == 1) {
            return (
                <div>No Exams to show</div>
            );
        }
        else if (this.state.flag == 404) {
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
export default StudentDashboard;