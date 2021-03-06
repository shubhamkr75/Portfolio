import React, { Component } from 'react'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import LoadingAnimation from './LoadingAnimation';
import ConfirmationMessage from './ConfirmationMessage';
class FetchResponse extends Component{
    constructor(props) {
        super(props);
        this.state = {
            answerList:[],
            questionList:[],
            fetched:0,
            questionPointer:1,
        };
        
        
      }

componentDidMount(){
    this.fetchQuestions(this.props.ExamId)
    this.fetchResponse();
}
    async fetchResponse(){
        if(this.state.fetched==0){
            var res;
            const token = sessionStorage.getItem('jwt');
            await fetch(`https://node-new.herokuapp.com/users/fetchResponse`, {
                method: "POST",
                headers: {
                "content-type": "application/json",
                "accept": "application/json",
                'Authorization': `Bearer ${token}`
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
            const token = sessionStorage.getItem('jwt');
            await fetch("https://node-new.herokuapp.com/users/questions",{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json",
                    'Authorization': `Bearer ${token}`
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
                    this.setState({questionList:data,fetched:1});
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ fetched: 404 });
                });
        }
    }
    saveAsPdf(){
        this.pdfExportComponent.save();
    }

    displayQuestions(){    
        let qlist = this.state.questionList[this.state.questionPointer-1];
        let chosen=this.state.answerList[qlist.id];
        let correctAnswer=qlist.identity / 54 - qlist.id - qlist.QuestionDesc.length;
        return (
            <div class="questionList">
                        <div>
                        <div class="questionDesc">Que<span class="hidden-xs">stion</span> No. {this.state.questionPointer}</div>
                        <table class="questionSection" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tbody><tr>                    
                                <td  valign="top"><p>{qlist.QuestionDesc}</p></td>
                            </tr>
                            
                                <tr className="optionSection">
                                    <td className="select-option" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={chosen == 1} Name={qlist.id}  /></td>
                                        <td className={(correctAnswer==1&&chosen==1)?"correct-answer optionDesc":(correctAnswer!=1&&chosen==1)?"wrong-answer optionDesc":correctAnswer==1?"correct-answer optionDesc":"optionDesc"} width="99%" >{qlist.Option1}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={chosen == 2} Name={qlist.id}  /></td>
                                            <td className={(correctAnswer==2&&chosen==2)?"correct-answer optionDesc":(correctAnswer!=2&&chosen==2)?"wrong-answer optionDesc":correctAnswer==2?"correct-answer optionDesc":"optionDesc"} width="99%" >{qlist.Option2}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={chosen == 3} Name={qlist.id}  /></td>
                                            <td className={(correctAnswer==3&&chosen==3)?"correct-answer optionDesc":(correctAnswer!=3&&chosen==3)?"wrong-answer optionDesc":correctAnswer==3?"correct-answer optionDesc":"optionDesc"} width="99%" >{qlist.Option3}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={chosen == 4} Name={qlist.id}  /></td>
                                            <td className={(correctAnswer==4&&chosen==4)?"correct-answer optionDesc":(correctAnswer!=4&&chosen==4)?"wrong-answer optionDesc":correctAnswer==4?"correct-answer optionDesc":"optionDesc"} width="99%" >{qlist.Option4}</td></tr></tbody></table>
                                    </td>
                                </tr>
                            </tbody></table></div>
                            <div class="navigation-button">
                        <div class="navigate">
                            <button type="button" class={this.state.questionPointer>1?"float-left test-button":"d-none"} onClick={()=>{this.state.questionPointer>1?this.setState({questionPointer:this.state.questionPointer-1}):this.setState({questionPointer:this.state.questionPointer})}}>Previous</button> 
                            <button type="button" class={this.state.questionPointer<this.state.questionList.length?"float-right test-button button-next":"d-none"} onClick={()=>{this.state.questionPointer<this.state.questionList.length?this.setState({questionPointer:this.state.questionPointer+1}):this.setState({questionPointer:this.state.questionPointer})}} >Next</button>
                        </div>
                    </div>
            </div>
        );       
}
questionStatus(){
    return(
        <div className="status-section">            
            <div className="status-content">
                <div className="status-available">
                <div class="col-xs-4 float-left">
                    <span class="answered states">0</span>
                    <span class="marker"><span>Correct</span></span></div>
                <div class="col-xs-4 ">
                    <span class="not-answered states">0</span>
                    <span class="marker"><span>Not Attempted</span></span></div>    
                <div class="col-xs-4 ">
                    <span class="not-visited states">0</span>
                    <span class="marker"><span>Incorrect</span></span></div>
                </div> 
            </div>
            <div className="numbering">
                <ul className="qnumbering">
                {(() => {
                    const list = [];
                    for (let i = 1; i <= this.state.questionList.length; i++) {
                        let qlist = this.state.questionList[i-1];
                        let correctAnswer=qlist.identity / 54 - qlist.id - qlist.QuestionDesc.length;
                        list.push(<li onClick={()=>this.setState({questionPointer:i})} id={'q'+i} class={this.state.answerList[i]==correctAnswer?"answered":this.state.answerList[i]==null?"not-answered":"not-visited"} value={i}>{i}</li>);
                    }
                    return list;
                })()}
                </ul>
            </div>                
        </div>
    );
}

    render(){
        // {(this.state.answerList.length==0&&this.state.fetched==0) &&  this.fetchResponse()}
        // {(this.state.questionList.length==0) && this.fetchQuestions(this.props.ExamId)}
        if(this.state.questionList.length!=0&&this.state.fetched!=0){
            return(
                <div class="exam-page">
                    {/* <button align="center" type="button" onClick={()=>this.saveAsPdf()} value="Save As PDF" id="saveAsPdf">Save as Pdf</button> */}
                    {/* <PDFExport  ref={(ref) => { this.pdfExportComponent = ref; }}  paperSize="A4"> */}
                    {this.displayQuestions()}  {this.questionStatus()}  
                    {/* </PDFExport>             */}
                </div>
            );
        }
        else if(this.state.fetched==404){
            let confirmation={
                success:false,
                message: <div className="message-info">Something went wrong</div>,
                url:"./studentdashboard"
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
export default FetchResponse;