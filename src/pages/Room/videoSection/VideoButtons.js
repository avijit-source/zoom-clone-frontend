import React from 'react'
import MicButton from './MicButton'
import CameraButton from "./CameraButton"
import LeaveRoomButton from "./LeaveRoomButton"
import ScreenSharingButton from "./ScreenSharingButton"
import { useSelector } from 'react-redux'

function VideoButtons(props) {
    const { connectWithOnlyAudio } = useSelector((state) => state.counter)
    return (
        <div className="video_buttons_container">

            <MicButton />
            {!connectWithOnlyAudio && (<><CameraButton /></>)}
            <LeaveRoomButton />
            {
                !connectWithOnlyAudio && (
                    <ScreenSharingButton />
                )
            }
        </div>
    )
}

export default VideoButtons