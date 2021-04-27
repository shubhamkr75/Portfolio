import React from "react";
import Questions from './Questions'
class ExamCreation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        examName: "Test",
        examTime: 60,
        testCreated: 1
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    createExam(){
      fetch("http://localhost:5000/users/createExam", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        examName: this.state.examName,
        examTime: this.state.examTime
      })
    })
    .then(data => {
      console.log(data)
      this.setState({
        testCreated:2
      });
    })
    .catch(err => {
      console.log(err);
      this.setState({
        testCreated:3
      });
    });
    }
    
    render() {
      if(this.state.testCreated==1){
      return (
        <div>
        <form>
          <label>
            Exam Name: 
            <input
              name="examName"
              type="text"
              value={this.state.examName}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Exam Time: 
            <input
              name="examTime"
              type="number"
              value={this.state.examTime}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input align="center" onClick={()=>this.createExam()} type="button" value="Create Exam" id="btnSubmitExam"/>
        </form>
        <br/><br/><br/>
        <input align="center" onClick={()=>this.setState({testCreated:4})} type="button" value="Examination Page" id="btnSubmitExam"/>
        </div>
      );
    }
    else if(this.state.testCreated==2){
      return(
        <div>
          <p>A new Test has been created successfully</p>
          <p>Test Name: {this.state.examName}</p>
          <p>Test Timing: {this.state.examTime}</p>
        </div>
      );
    }
    else if(this.state.testCreated==3){
      return(
        <div>
          <p>Something went wrong while creating the test</p>
        </div>
      );
    }
    else if(this.state.testCreated==4){
      return(
        <Questions />
      );
    }
  }
  
  }
  export default ExamCreation;