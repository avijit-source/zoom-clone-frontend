import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIdentity, setRoomId } from '../../features/counterSlice';
import { getRoomExists } from '../../utils/api';
import ErrorMessage from './ErrorMessage';
import JoinRoomButtons from './JoinRoomButtons';
import JoinRoomInputs from './JoinRoomInputs';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';

function JoinRoomContent(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const connAudioBool = useSelector((state) => state.counter.connectWithOnlyAudio)
    const [roomIdValue, setRoomIdValue] = useState("");
    const [errorMessage, setErrorMessage] = useState(null)
    const [nameValue, setNameValue] = useState("");
    const isRoomHost = useSelector((state) => state.counter.isRoomHost)
    const handleJoinRoom = async () => {
        dispatch(setIdentity(nameValue))
        if (isRoomHost) {
            createRoom()
        } else {
            await joinRoom();
        }
        // console.log("joining")
    }


    const joinRoom = async () => {
        const responseMessage = await getRoomExists(roomIdValue);

        const { roomExists, full } = responseMessage;

        if (roomExists) {
            if (full) {
                setErrorMessage("Meeting is full , please try again later")
            } else {
                // join a room
                dispatch(setRoomId(roomIdValue))
                navigate("/room");
            }
        } else {
            setErrorMessage("Room Not Found,check your meeting id")
        }
    }

    const createRoom = () => {

        navigate("/room");
    }
    return (
        <>
            <JoinRoomInputs
                roomIdValue={roomIdValue}
                setRoomIdValue={setRoomIdValue}
                nameValue={nameValue}
                setNameValue={setNameValue}
                isRoomHost={isRoomHost}
            />
            <OnlyWithAudioCheckbox connAudioBool={connAudioBool} />
            <ErrorMessage errorMessage={errorMessage} />
            <JoinRoomButtons
                handleJoinRoom={handleJoinRoom}
                isRoomHost={isRoomHost}
            />
        </>
    )
}

export default JoinRoomContent