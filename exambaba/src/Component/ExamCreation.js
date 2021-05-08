import React from "react";
import Questions from './Questions'
import axios from 'axios'
class ExamCreation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        examName: "Test",
        examTime: 60,
        testCreated: 1,
        classesList: [],
        class:"",
        fetched:false,
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
    fetchClasses(){
      this.setState({fetched:true});
      fetch(`http://localhost:5000/users/fetchClasses`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: 
           JSON.stringify({
               schoolId:this.props.schoolId,
          })
        })
      .then((res) => res.json())
      .then((data) => {    
             if((data.recordset[0]!=undefined||data.recordset[0]!=null)&&data.recordset[0].classes!=null)       
             {this.setState({classesList:JSON.parse(data.recordset[0].classes)}); 
              }    
      });
    }
    createExam(){
    let examId=this.getRandomInt(99999);
    let formData = new FormData();
    formData.append('examName', this.state.examName);
    formData.append('examTime', this.state.examTime);
    formData.append('examId', examId);
    formData.append('classSelected', this.state.class);
    formData.append('schoolId', this.props.schoolId);    
    formData.append('studentId', this.props.studentId);    
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
      {!this.state.fetched && this.fetchClasses()}
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
        <br/>
        <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Class</h6>
                                </label> 
                                <select name="class" type="number" onChange={this.handleInputChange}>
                                  <option value=""></option>
                                      {this.state.classesList.map((clist) => {
                                          return(
                                              <option value={clist}>{clist}</option>
                                          );
                                      })}
                                </select> 
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