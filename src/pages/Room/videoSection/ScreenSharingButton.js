import React, { useState } from 'react'
import { MdScreenShare, MdStopScreenShare } from "react-icons/md"
import LocalScreenSharingPreview from './LocalScreenSharingPrevie';
import * as webrtchandler from "../../../utils/webrtchandler";
const constrains = {
    audio: false,
    video: true
}
function ScreenSharingButton() {
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);

    const handleScreenShareToggle = async () => {
        if (!isScreenSharingActive) {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(constrains);
            } catch (err) {
                console.log("error occured when trying to get access to screen share stream")
            }
            if (stream) {
                setScreenSharingStream(stream);
                webrtchandler.toggleScreenShare(isScreenSharingActive, stream)
                setIsScreenSharingActive(true)

                stream.getVideoTracks()[0].onended = function () {
                    // doWhatYouNeedToDo();
                    console.log("isscreensharingactive", isScreenSharingActive)
                    webrtchandler.toggleScreenShare(true)
                    setIsScreenSharingActive(false);
                    setScreenSharingStream(null)

                };
            }
        } else {
            webrtchandler.toggleScreenShare(isScreenSharingActive)
            setIsScreenSharingActive(false);
            screenSharingStream.getTracks().forEach(t => t.stop());
            setScreenSharingStream(null)
        }
    }

    // const handleScreenShare = () => {
    //     setIsScreenSharingActive(!isScreenSharingActive)
    // }
    return (
        <>
            <div className="video_button_container">
                {!isScreenSharingActive ? <MdScreenShare size={"25px"} color="white" onClick={handleScreenShareToggle} /> :
                    <MdStopScreenShare size={"25px"} color="white" onClick={handleScreenShareToggle} />}
            </div>
            {
                isScreenSharingActive && (
                    <LocalScreenSharingPreview stream={screenSharingStream} />
                )
            }
        </>
    )
}

export default ScreenSharingButton