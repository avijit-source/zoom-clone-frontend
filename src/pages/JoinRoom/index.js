import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { setRoomHost } from '../../features/counterSlice';
import "./JoinRoom.css";
import JoinRoomContent from './JoinRoomContent';
import JoinRoomTitle from './JoinRoomTitle';
function JoinRoom(props) {
    const dispatch = useDispatch()
    const location = useLocation();
    const isRoomHost = useSelector((state) => state.counter.isRoomHost)
    console.log(location)
    useEffect(() => {
        const isRoomHost = new URLSearchParams(location.search).get("host");
        if (isRoomHost) {
            dispatch(setRoomHost(true))
        } else {
            dispatch(setRoomHost(false))
        }
    }, [])
    return (
        <div className="join_room_page_container">
            <div className="join_room_page_panel">
                <JoinRoomTitle isRoomHost={isRoomHost} />
                <JoinRoomContent />
            </div>

        </div>
    )
}

export default JoinRoom