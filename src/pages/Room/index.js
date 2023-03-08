import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import ChatSection from './chatSection/ChatSection';
import ParticipantsSection from './participantsSection/ParticipantsSection';
import "./Room.css";
import RoomLabel from './RoomLabel';
import VideoSection from './videoSection/videoSection';
import * as webRTCHandler from "../../utils/webrtchandler";
import OverLay from './OverLay';

function Room() {

    const { roomId, identity, isRoomHost, showOverlay, connectWithOnlyAudio } = useSelector((state) => state.counter)

    useEffect(() => {
        if (!isRoomHost && !roomId) {
            const siteUrl = window.location.origin;
            window.location.href = siteUrl
        } else {
            webRTCHandler.getLocalPreviewInitRoomConnection(
                isRoomHost,
                identity,
                roomId,
                connectWithOnlyAudio
            )
        }
    }, [])
    return (
        <div className="room_container">

            <ParticipantsSection />
            <VideoSection />
            <ChatSection />
            <RoomLabel roomId={roomId} />
            {showOverlay && (
                <OverLay />
            )}
        </div>
    )
}

export default Room