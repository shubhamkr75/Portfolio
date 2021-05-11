import React, { Component } from 'react';

class LoadingAnimation extends Component {
    render() {
        return (
            <div class="animation-loader">
                <span class="animation"><span class="loader-inner"></span></span>
            </div>
        );
    }
}

export default LoadingAnimation;