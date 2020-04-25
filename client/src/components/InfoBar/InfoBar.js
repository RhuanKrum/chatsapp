import React from 'react'

import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'

import './InfoBar.css'

const InfoBar = ({ infoText }) => (
    <div className="infoBar">
        <div className="infoBarLeftContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online" />
            <h3>{ infoText }</h3>
        </div>
        <div className="infoBarRightContainer">
            <a href="/">
                <img src={closeIcon} alt="close" />
            </a>
        </div>
    </div>
)

export default InfoBar