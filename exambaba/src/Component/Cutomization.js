import React, { Component } from 'react';
import swiggyData from '../Assets/json/swiggy.json';
import SwiggyPopup from './SwiggyPopup';
class Cutomization extends Component {
    constructor() {
        super();
        this.state = {
            showPopup: false,
            currentData: null
        }
    }
    hidePopup=()=>{
        document.body.style.overflow="auto";
        this.setState({
            showPopup:false,
            currentData: null
        })
    }
    showCustomization(record) {
        document.body.style.overflow="hidden";
        this.setState({
            showPopup:true,
            currentData: record
        })        
    }
    render() {
        return (
            <div className="swiggy">
                <div className="swiggyButtons">

                <h3 className="exam-dashboard-title">Food Menu</h3>
                <table id="examListTable" className="col-md-12" cellpadding="2" >
						<tbody><tr id="thead">
							<th id="Td1" class="user"> S.No</th>
							<th id="Td2"> Menu Name</th>
							<th id="Td3"> Customiztion</th>							
						</tr>
        
                {swiggyData.map((list,index) => {
                return(
                        <tr id="tbody">
                        <td>                    
                            <span id="index">{index+1}</span>
                        </td>
                        <td>
                            <span id="examName">{list.product}</span>
                        </td>
                        <td>
                        <button type="submit" id="login-button" className="btn submit-button  text-center" onClick={() => this.showCustomization(list)}>Customize</button>
                        </td>                        
                    </tr>
                );
            })}
            </tbody></table>



                    {/* {swiggyData.map((data) => {
                        return (
                            <div>
                                {data.product}<button type="submit" id="login-button" className="btn submit-button  text-center" onClick={() => this.showCustomization(data)}>Customize</button>
                            </div>
                        );
                    })} */}
                </div>
                <div className="swiggyPopup">
                    {this.state.showPopup && <SwiggyPopup record={this.state.currentData} hideFunction={this.hidePopup}/>}
                </div>
            </div>
        );
    }
}

export default Cutomization;