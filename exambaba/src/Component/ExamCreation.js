import React from "react";
import Questions from './Questions'
import axios from 'axios'
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
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    createExam(){
    let examId=this.getRandomInt(99999);
    let formData = new FormData();
    formData.append('examName', this.state.examName);
    formData.append('examTime', this.state.examTime);
    formData.append('examId', examId);
    formData.append('file', this.uploadInput.files[0]);
    //   fetch("http://localhost:5000/users/createExam", {
    //   method: "POST",
    //   headers: {
    //   //   "content-type": "application/json",
    //     "content-type":'multipart/form-data',
    //   //   "accept": "application/json"
    //   },
    //   body: formData,
    //   //  JSON.stringify({
    //   //   examName: this.state.examName,
    //   //   examTime: this.state.examTime,
    //   //   //'file': this.uploadInput.files[0]
    //   // })
    // })
    axios.post("http://localhost:5000/users/createExam", formData, {
        })
    .then(response => {
      console.log(response);
         if (response.status!==200) {
            this.setState({
              testCreated:3
            });
         } else{
          this.setState({
            testCreated:2
          });
         }
        })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err);
      this.setState({
        testCreated:3
      });
    });
    }
    
    render() {
      if(this.state.testCreated==1){      //starting UI
      return (
        <div>
        <form>
          <label>
            Exam Name: 
            <input
              name="examName"
              type="text"
              required
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
          <div><br/>
          <label>
          Question File
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
            </label>
        </div>
          <br />
          <input align="center" onClick={()=>this.createExam()} type="button" value="Create Exam" id="btnSubmitExam"/>
        </form>
        <br/><br/><br/>
        <input align="center" onClick={()=>this.setState({testCreated:4})} type="button" value="Examination Page" id="btnSubmitExam"/>
        </div>
      );
    }
    else if(this.state.testCreated==2){  //success message on test creation
      return(
        <div>
          <p>A new Test has been created successfully</p>
          <p>Test Name: {this.state.examName}</p>
          <p>Test Timing: {this.state.examTime}</p>
        </div>
      );
    }
    else if(this.state.testCreated==3){   //if test creation fails
      return(
        <div>
          <p>Something went wrong while creating the test</p>
        </div>
      );
    }
    else if(this.state.testCreated==4){     //if user clicks on examination button
      return(
        <Questions />
      );
    }
  }
  
  }
  export default ExamCreation;