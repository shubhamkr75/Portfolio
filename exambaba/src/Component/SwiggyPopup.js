import React, { Component } from 'react';

class SwiggyPopup extends Component {

    constructor() {
        super();
        this.state = {
            selectedItems: [],
            additionalItems:false
        }
    }
    componentDidMount() {        
        let inputs = document.querySelectorAll(".subchoices .subchoice-item:first-child input[type=radio]");      
        for (let i = 0; i < inputs.length; i++)
        inputs[i].checked=true;         //bydefault the first radio button will be selected
        this.selectedItems();
    }
    //collect all the items that has been selected to show in the popub
    selectedItems = () => {
        let items = []
        let inputs = document.querySelectorAll("#details-modal input[type=radio]");
        for (let i = 0; i < inputs.length; i++)
            if (inputs[i].checked) items.push(inputs[i].value)      //pushing all the items to array
        this.setState({ selectedItems: items })             //keeping the selected value in state variable
    }
    topchoices=()=>{
        const selectItems=this.state.selectedItems;
        const arrayLength=this.state.additionalItems?selectItems.length:2           //taking the length of selected options
        const classN=!this.state.additionalItems?"selectedList":"selectedList addon-animation"
        return(
            <div className="selected-choices">
                <div className="add-ons">
                    {
                        !this.state.additionalItems?
                    <span className="additional-choices" onClick={()=>this.setState({additionalItems:true})}>{selectItems.length>2?selectItems.length-2+"+ Add On":""}</span>:
                    <span className="additional-choices" onClick={()=>this.setState({additionalItems:false})}>Hide</span>
                    }
                </div>                
                <div className={classN}>
                    {selectItems.slice(0,arrayLength).map((data, index) => {
                        return (
                            <span className="choices">{index != 0 ? ", " + data : data}</span>
                        )
                    })}
                </div>
            </div>
        )
    }
    scrollFunction=(e,index)=>{
        const classN="recordid"+index;
        const anchors=document.querySelectorAll(".breadcrumb-records a");
        for(let i=0;i<anchors.length;i++){
            anchors[i].classList.remove("active");
        }
        document.getElementById(classN).classList.add("active")
        console.log(e);
    }
    render() {
        const { record, hideFunction } = this.props;
        return (
            <div>
                <div className="modal-backgroud"></div>
                <div className="details-modal swiggy-popup" id="details-modal">
                    <div className="inner-modal">
                        <div className="details-modal-close" onClick={hideFunction}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="black" />
                            </svg>
                        </div>
                        <div className="details-modal-title">
                            <h1><span class="veg-icon"></span>Customize "{record.product}"</h1>
                            <div class="price"><span class="priceValue">₹{record.price}</span></div>
                        </div>
                        <div className="details-modal-content">
                            <div className="records">
                                <div className="modal-breadcrumb">
                                    <div className="breadcrumb-records">
                                        {record.choices.map((data, index) => {
                                            let id = "#record" + index
                                            let classid="recordid"+index;
                                            let classM=  "subtitle"                      
                                            if(index==0)
                                            classM=classM+" active";
                                            return (
                                                <a href={id} id={classid} className={classM} onClick={(e) => this.scrollFunction(e,index)}><span>{data.name}</span></a>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="desription-list">
                                    <div class="record-shadow"></div>
                                    <div className="records-description">
                                        {record.choices.map((data, index) => {
                                            let id = "record" + index
                                            return (
                                                <div id={id} className="record-list">
                                                    <h3 className="list-title">{data.name}</h3>
                                                    <div className="subchoices">
                                                        {data.subchoices.map((subchoices, index) => {
                                                            return (
                                                                <div className="subchoice-item">
                                                                    <span class="veg-icon veg-icon-subchoices"></span>
                                                                    <input type="radio" Name={id} value={subchoices} onClick={this.selectedItems} /><span>{subchoices}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}                                        
                                    </div>
                                    <div class="record-shadow-bottom"></div>
                                </div>
                            </div>
                                        
                        </div>
                        <div className="button-section">
                        {this.topchoices()}
                            <div className="button-action">
                                <div className="button-submit" onClick value="Confirm" id="confirm">
                                    <span>Total ₹{record.price}</span>
                                    <span class="add-item">ADD ITEM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SwiggyPopup;