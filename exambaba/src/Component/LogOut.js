import React, { Component } from 'react';
class LogOut extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    handleSubmit(){
        sessionStorage.removeItem('token');
        window.location.reload();
    }
    render(){
        return(
            <div className="logout-section">
                <button onClick={this.handleSubmit} type="submit" className="btn btn-blue text-center">Logout</button>
            </div>
        );
    }
}
export default LogOut;