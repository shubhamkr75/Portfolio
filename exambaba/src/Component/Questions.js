import { render } from '@testing-library/react';
import React, { Component, useState } from 'react';
import update from 'react-addons-update';
import './Questions.css'
class Questions extends Component {
    // const [questionList,setquestionList] = useState([]);   
    // const [checkdata, setCheckdata] = useState(false); 
    constructor(){
        super();
        this.state={
            questionList: Array().fill(null),
            examList: Array().fill(null),
            checkdata: false,
            examdata: false,
            examtime:null,
            showResult: false,
            answerList: Array().fill(null),
            marks: 0  ,
            timeOut:false          
        }
    }
    
    fetchQuestions(id,exam_time){
        if(!this.state.checkdata){     //if question is not rettrieved
        fetch(`http://localhost:5000/users/questions/${id}`)
            .then((res) => res.json())
            .then((data) => {
                // setquestionList(data.Questions);
                // setCheckdata(true);
                this.setState({questionList:data.Questions,checkdata:true,examtime:exam_time});                
            });
        }
    }
    displayQuestions(){        
            return(
                <div class="questionList">
                {this.state.questionList.map((qlist) => {
                    return(
                <table class="questionSection" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tbody><tr>
                    <td class="bix-td-qno" rowspan="2" valign="top" align="left"><p>{qlist.id}.&nbsp;</p></td>
                    <td class="bix-td-qtxt" valign="top"><p>{qlist.QuestionDesc}</p></td>
                </tr>
                <tr>
                    <td  valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" Name={qlist.id} onClick={(e)=>this.saveResponse(e,qlist.id,1)}/></td><td class="bix-td-option" width="1%" id="tdOptionNo_A_434"><a id="lnkOptionLink_A_434" href="javascript: void 0;">A.</a></td>
                    <td  width="99%" >{qlist.Options[0].OptionDesc}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" Name={qlist.id} onClick={(e)=>this.saveResponse(e,qlist.id,2)}/></td><td width="1%" ><a id="lnkOptionLink_B_434" href="javascript: void 0;">B.</a></td>
                    <td width="99%" >{qlist.Options[1].OptionDesc}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" Name={qlist.id} onClick={(e)=>this.saveResponse(e,qlist.id,3)}/></td><td  width="1%" ><a id="lnkOptionLink_C_434" href="javascript: void 0;">C.</a></td>
                    <td width="99%" >{qlist.Options[2].OptionDesc}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" Name={qlist.id} onClick={(e)=>this.saveResponse(e,qlist.id,4)} /></td><td  width="1%"><a id="lnkOptionLink_D_434" href="javascript: void 0;">D.</a></td>
                    <td width="99%" >{qlist.Options[3].OptionDesc}</td></tr></tbody></table>                    
                    </td>
                </tr>
                </tbody></table> 
                );
            })} 
            </div>
        );        
    }
    fetchExams(){
        if(!this.state.examdata){     //if exam is not rettrieved
            fetch(`http://localhost:5000/users/exams`)
                .then((res) => res.json())
                .then((data) => {
                    // setquestionList(data.Questions);
                    // setCheckdata(true);
                    this.setState({examList:data.recordset,examdata:true});                
                });
        }
    }
    saveResponse(event,id,response){
        if(event.target.checked){
            if(this.state.answerList[id]===response){
                this.setState(update(this.state, {
                    answerList: {
                      [id]: {
                        $set: null
                      }
                    }
                  }));
                  event.target.checked=false;
            }
            else{
                this.setState(update(this.state, {
                    answerList: {
                    [id]: {
                        $set: response
                        }
                    }
                }));
            }
        }
        
    }
    calculateMarks(){
        let marksCalculated=0;
        for(let i=0;i<this.state.questionList.length;i++){ 
            if(this.state.questionList[i].answer===this.state.answerList[this.state.questionList[i].id]){
                marksCalculated++;
            }
        }        
        this.setState({checkdata:false,showResult:true,marks:marksCalculated});
    }
    setTimer=()=>{
        let startTime=Date.now();
        startTime=startTime+1*this.state.examtime*60*1000;
        var x = setInterval(()=> {
            var distance = startTime - Date.now();
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if(document.getElementById("timeLeft"))
            document.getElementById("timeLeft").innerHTML = hours + ":"
            + minutes + ":" + seconds;
              
            // If the count down is over, write some text 
            if (distance < 0) {
              clearInterval(x);
              this.calculateMarks();
              this.setState({timeOut:true});
            }
          }, 1000);
    }

    // }
    render(){ 
    {this.fetchExams()}    
        if(this.state.checkdata&&!this.state.showResult&&!this.state.timeOut){   
            this.setTimer();         
            return(                    
            <div class="bix-div-container">{this.displayQuestions()}
                <div id="divSubmitTest" align="center">
                 <input align="center" onClick={()=>this.calculateMarks()} type="button" value="Submit Test" id="btnSubmitTest"/>
                 <div id="timeLeftDiv">
                    Time Left: <span id="timeLeft"></span>
                </div>
                </div>
            </div>
            );
            
        }
        else if(this.state.showResult&&!this.state.timeOut){
            return(                    
                <div class="bix-div-container">
                   <h1 class="display-3">Thank You. Your Response has been Submitted</h1>
                    <p class="lead"><strong>Your Total Score is </strong> 
                    <span id="result"> {this.state.marks}</span>/{this.state.questionList.length}</p>
                    
                </div>
            );
        }
        else if(this.state.timeOut){
            return(                    
                <div class="bix-div-container">
                   <h1 class="display-3">Times Up. Your Response has been Submitted</h1>
                    <p class="lead"><strong>Your Total Score is </strong> 
                    <span id="result"> {this.state.marks}</span>/{this.state.questionList.length}</p>
                    
                </div>
            );
        }
        else if(this.state.examdata){
            
            return(
                <div>
                    <h3>Welcome to EXAM BABA</h3>
                    <p>Please take the below available test for You</p>
                    {this.state.examList.map((list) => {
                        return(
                            <div className="examList">
                                <button onClick={()=>this.fetchQuestions(list.ExamId,list.Exam_Time)}>{list.ExamName}</button>
                                
                            </div>
                        );
                    })}
                </div>
            );
        }
        else{
            return(
            <div>cannot render data</div>
            );
        }
    }
}
export default Questions;