import React, { Component } from 'react';
 
class LoginFooter extends Component {
    render() {
        return (
            <div>
                <footer id="contact" class="page-footer font-small blue-grey lighten-5 footer-component">
 
                    <div  className="footer-color" >
                    <div class="container">
                        <div class="row py-4 d-flex align-items-center">
                        <div class="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                            <h6 class="mb-0">Get connected with us on social networks!</h6>
                        </div>
                    
                        <div class="col-md-6 col-lg-7 text-center text-md-right">
                            <a class="fb-ic">
                            <span class="fa fa-facebook mr-4 text-sm"></span>
                            </a>
                            <a class="tw-ic">
                            <span class="fa fa-twitter mr-4  text-sm"></span>
                            </a>
                            <a class="gplus-ic">
                            <span class="fa fa-google-plus mr-4 text-sm"></span>
                            </a>
                            <a class="li-ic">
                            <span class="fa fa-linkedin mr-4 text-sm"></span>
                            </a>
                            
                        </div>
                        </div>
                    </div>
                    </div>
 
 
                        <div class="container text-center text-md-left mt-5">
 
                            <div class="row mt-3 dark-grey-text">
                                <div class="col-md-4 col-lg-4 col-xl-4 mb-4">
                                    <h6 class="text-uppercase font-weight-bold">Exam Baba</h6>
                                    <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" styles="width: 60px;"/>
                                    <p>An automated examination platform to organize tests</p>
                                </div>
 
                                <div class="col-md-4 col-lg-4 col-xl-4  mb-4">
                                    <h6 class="text-uppercase font-weight-bold">Useful links</h6>
                                    <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" styles="width: 60px;"/>
                                    <p>
                                        <a class="dark-grey-text" href="#login">Login</a>
                                    </p>
                                    <p>
                                        <a class="dark-grey-text" href="#products">Product Description</a>
                                    </p>
                                    <p>
                                        <a class="dark-grey-text" href="#demo">Demo</a>
                                    </p>
                                    <p>
                                        <a class="dark-grey-text" href="#contact">Contact Us</a>
                                    </p>
                                </div>
                                <div class="col-md-4 col-lg-4 col-xl-4  mb-md-0 mb-4">
                                    <h6 class="text-uppercase font-weight-bold">Contact</h6>
                                    <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" styles="width: 60px;"/>
                                    <p>
                                        <i class="fa fa-home" aria-hidden="true"></i> India</p>
                                    <p>
                                    <i class="fa fa-envelope"></i><a class="pl-2" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=exambaba16@gmail.com" target="_blank">exambaba16@gmail.com</a></p>
                                    <p>
                                    <i class="fa fa-phone" aria-hidden="true"></i> +91-8292774260</p>
                                    <p>
                                    <i class="fa fa-phone" aria-hidden="true"></i> +91-9611729806</p>
                                </div>
                            </div>   
                        </div>
 
                    <div class="footer-copyright text-center  py-3"><small class="ml-4 ml-sm-5 mb-2">Copyright © 2021. All rights reserved.</small>
                    </div>
                </footer>
            </div>
        );
    }
}
 
export default LoginFooter;
