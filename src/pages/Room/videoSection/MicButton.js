import React, { useState } from 'react'
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs"
import * as webrtchanlder from "../../../utils/webrtchandler";

function MicButton(props) {
    const [isMicMuted, setIsMicMuted] = useState(false);
    const handleMic = () => {
        webrtchanlder.toggleMic(isMicMuted)
        setIsMicMuted(!isMicMuted)
    }
    return (
        <div className="video_button_container">
            {
                isMicMuted ? <BsFillMicMuteFill color='white' size={"25px"} onClick={handleMic} />
                    : <BsFillMicFill color='white' size={"25px"} onClick={handleMic} />
            }
            {/* <img
                src={isMicMuted ? <BsFillMicMuteFill /> : MicButtonImg}
                onClick={handleMic}
                className="video_button_image"
            /> */}
        </div>
    )
}

export default MicButton