import React from 'react'
const Input = ({ isRoomHost, placeholder, value, changeHandler }) => {
    return (
        <input
            value={value}
            onChange={changeHandler}
            placeholder={placeholder}
            className="join_room_input"
        />
    )
}
function JoinRoomInputs({
    roomIdValue,
    setRoomIdValue,
    nameValue,
    setNameValue,
    isRoomHost
}) {

    const handleRoomIdValueChange = (e) => {
        setRoomIdValue(e.target.value);
    }
    const handleNameValueChange = (e) => {
        setNameValue(e.target.value);
    }
    return (
        <div className="join_room_inputs_container">
            {
                !isRoomHost && (
                    <Input
                        placeholder={"Enter meeting id"}
                        value={roomIdValue}
                        changeHandler={handleRoomIdValueChange}
                    />
                )
            }
            <Input
                placeholder={"Enter your name"}
                value={nameValue}
                changeHandler={handleNameValueChange}
            />
        </div>
    )
}

export default JoinRoomInputs