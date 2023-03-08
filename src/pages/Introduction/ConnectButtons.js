import React from 'react'
import { useNavigate } from 'react-router-dom'
import ConnectButton from './ConnectButton'

function ConnectButtons() {
    const navigate = useNavigate();

    const joinRoomPage = () => {
        navigate("/join-room")
    }

    const joinRoomPageAsHost = () => {
        navigate("/join-room?host=true")
    }
    return (
        <div className="connecting_buttons_container">
            <ConnectButton buttonText={"Join a Meeting"}
                onClickHandler={joinRoomPage}
            />
            <ConnectButton buttonText={"Host a meeting"}
                onClickHandler={joinRoomPageAsHost}
                createRoomButton
            />

        </div>
    )
}

export default ConnectButtons