import React, { Component } from 'react'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import LoadingAnimation from './LoadingAnimation';
class FetchResponse extends Component{
    constructor(props) {
        super(props);
        this.state = {
            answerList:[],
            questionList:[],
            fetched:0,
        };
        this.fetchResponse();
        this.fetchQuestions(this.props.ExamId)
      }


    async fetchResponse(){
        if(this.state.fetched==0){
            var res;
            await fetch(`http://localhost:5000/users/fetchResponse`, {
                method: "POST",
                headers: {
                "content-type": "application/json",
                "accept": "application/json"
                },
                body: 
                JSON.stringify({
                examId: this.props.ExamId,
                studentId: this.props.studentId,
                // examTime: this.state.examTime,
                //'file': this.uploadInput.files[0]
                })
            })
            .then((res) => res.json())
            .then((data) => {           
            console.log(data); 
            res=data.recordset.length; 
            if((data.recordset[0]!=undefined||data.recordset[0]!=null)&&data.recordset[0].ResponseAnswer!=null){
                this.setState({answerList:JSON.parse(data.recordset[0].ResponseAnswer),fetched:1}); //fetching saved response           
                }
                else if(data.recordset[0]!=undefined||data.recordset[0]!=null){
                    this.setState({fetched:1});
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({fetched:404}); 
            });
        }
    }
    async fetchQuestions(id){
        if(this.state.questionList.length==0){     //if question is not rettrieved
            await fetch(`http://localhost:5000/users/questions/${id}`)
            .then((res) => res.json())
            .then((data) => {
                // setquestionList(data.Questions);
                // setCheckdata(true);
                this.setState({questionList:data});                
            });
        }
    }
    saveAsPdf(){
        this.pdfExportComponent.save();
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
                        <td  valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id]==1} Name={qlist.id} /></td><td class="bix-td-option" width="1%" id="tdOptionNo_A_434">A.</td>
                        <td  width="99%" >{qlist.Option1}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id]==2} Name={qlist.id} /></td><td width="1%" >B.</td>
                        <td width="99%" >{qlist.Option2}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id]==3} Name={qlist.id} /></td><td  width="1%" >C.</td>
                        <td width="99%" >{qlist.Option3}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id]==4} Name={qlist.id} /></td><td  width="1%">D.</td>
                        <td width="99%" >{qlist.Option4}</td></tr></tbody></table>                    
                        </td>
                    </tr>
                    </tbody></table> 
                );
        })} 
        </div>
    );        
}

    render(){
        // {(this.state.answerList.length==0&&this.state.fetched==0) &&  this.fetchResponse()}
        // {(this.state.questionList.length==0) && this.fetchQuestions(this.props.ExamId)}
        if(this.state.questionList.length!=0&&this.state.fetched!=0){
            return(
                <div class="bix-div-container">
                    <button align="center" type="button" onClick={()=>this.saveAsPdf()} value="Save As PDF" id="saveAsPdf">Save as Pdf</button>
                    <PDFExport  ref={(ref) => { this.pdfExportComponent = ref; }}  paperSize="A4">
                    {this.displayQuestions()}    
                    </PDFExport>            
                </div>
            );
        }
        else if(this.state.fetched==404){
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
export default FetchResponse;