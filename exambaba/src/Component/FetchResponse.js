import React, { Component } from 'react'
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
                        <td  valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id]==1} Name={qlist.id} /></td><td class="bix-td-option" width="1%" id="tdOptionNo_A_434"><a id="lnkOptionLink_A_434" href="javascript: void 0;">A.</a></td>
                        <td  width="99%" >{qlist.Option1}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id]==2} Name={qlist.id} /></td><td width="1%" ><a id="lnkOptionLink_B_434" href="javascript: void 0;">B.</a></td>
                        <td width="99%" >{qlist.Option2}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id]==3} Name={qlist.id} /></td><td  width="1%" ><a id="lnkOptionLink_C_434" href="javascript: void 0;">C.</a></td>
                        <td width="99%" >{qlist.Option3}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="radio" checked={this.state.answerList[qlist.id]==4} Name={qlist.id} /></td><td  width="1%"><a id="lnkOptionLink_D_434" href="javascript: void 0;">D.</a></td>
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
                    {this.displayQuestions()}                
                </div>
            );
        }
        else{
            return(
                <div>Waiting/Cannot render data</div>
            );
        }
    }
}
export default FetchResponse;