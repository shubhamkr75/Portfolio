import React, { Component } from 'react';
import introduction from '../Assets/image/Introduction.png';
import glimpse from '../Assets/image/glimpse.png';
import response from '../Assets/image/response.png';
import advantages from '../Assets/image/advantages.png';

class Carousel extends Component {
    render() {
        return (

            <div id="carousel-description" class="carousel slide p-5" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carousel-description" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-description" data-slide-to="1" ></li>
                    <li data-target="#carousel-description" data-slide-to="2" ></li>
                    <li data-target="#carousel-description" data-slide-to="3" ></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active" >
                        <img class="d-block w-75 carousel-img" src={introduction} alt="First slide" />
                    </div>
                    <div class="carousel-item ">
                        <img class="d-block w-75 carousel-img" src={glimpse} alt="Secound slide" />
                    </div>
                    <div class="carousel-item ">
                        <img class="d-block w-75 carousel-img" src={response} alt="Third slide" />
                    </div>
                    <div class="carousel-item ">
                        <img class="d-block w-75 carousel-img" src={advantages} alt="Fourth slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carousel-description" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel-description" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>


        );
    }
}

export default Carousel;