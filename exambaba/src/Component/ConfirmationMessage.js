import React, { Component } from 'react';

class ConfirmationMessage extends Component {
    render() {
        return (
            <div id='message-card' class="animated fadeIn">
                <div id={this.props.success?'message-upper-side':'message-upper-side'} class={this.props.success?'success':'error'}>
                    {this.props.success!='neutral' && <i class={this.props.success?"fa fa-check-circle":"fa fa-times-circle"}></i>}
                    <h3 id='message-status'>
                    {this.props.success!='neutral'?this.props.success?"Success":"Failure":""}
                    </h3>
                </div>
                <div id='lower-side'>
                    <p id='message'>
                    {this.props.message}
                    </p>
                    {this.props.url && <a href={this.props.url} id="contBtn">Continue</a>}
                </div>
            </div>
        );
    }
}

export default ConfirmationMessage;