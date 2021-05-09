import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="footer-component">
                <div className="bg-blue py-4">
                    <div className="row px-3"> <small className="ml-4 ml-sm-5 mb-2">Copyright &copy; 2021. All rights reserved.</small>
                        <div className="social-contact ml-4 ml-sm-auto"> <span className="fa fa-facebook mr-4 text-sm"></span> <span className="fa fa-google-plus mr-4 text-sm"></span> <span className="fa fa-linkedin mr-4 text-sm"></span> <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span> </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;