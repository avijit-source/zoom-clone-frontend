import React from 'react'
import "./Introduction.css";
import logo from "../../resources/images/logo.png"
import ConnectButtons from './ConnectButtons';
function Introduction(props) {
    return (
        <div className="introduction_page_container">
            <div className="introduction_page_panel">
                <img src={logo} className="introduction_page_image" />
                <ConnectButtons />
            </div>
        </div>
    )
}

export default Introduction