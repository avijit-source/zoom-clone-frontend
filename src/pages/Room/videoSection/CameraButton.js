import React, { useState } from 'react'
import { BsCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs"
import * as webrtchandler from "../../../utils/webrtchandler";
function CameraButton() {
    const [isLocalCamDisabled, setIsLocalCamDisabled] = useState(false);

    const handleCameraButtonClick = () => {
        webrtchandler.toggleCamera(isLocalCamDisabled)
        setIsLocalCamDisabled(!isLocalCamDisabled)
    }
    return (
        <div className="video_button_container">
            {isLocalCamDisabled ? <BsCameraVideoOffFill onClick={handleCameraButtonClick} size={"25px"} color="white" /> : <BsCameraVideoFill size={"25px"} color="white" onClick={handleCameraButtonClick} />}
        </div>
    )
}

export default CameraButton