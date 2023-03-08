import React from 'react'
import { useDispatch } from 'react-redux'
import { setConnectAudio } from '../../features/counterSlice'
import checkImg from "../../resources/images/check.png"
function OnlyWithAudioCheckbox({ connAudioBool }) {
    const dispatch = useDispatch()
    const handleConnectionTypeChange = () => {
        dispatch(setConnectAudio(!connAudioBool))
    }
    return (
        <div className="checkbox_container">
            <div className="checkbox_connection"
                onClick={handleConnectionTypeChange}
            >
                {connAudioBool && (
                    <img src={checkImg} className="checkbox_img" />
                )}
            </div>
            <p className="checkbox_container_paragraph">Only audio</p>

        </div>
    )
}

export default OnlyWithAudioCheckbox