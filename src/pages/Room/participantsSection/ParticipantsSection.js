import React from 'react'
import ParticipantsLabel from "./ParticipantsLabel.js"
import Participants from "./Participants.js"
function ParticipantsSection() {
    return (
        <div className="participants_section_container">
            <ParticipantsLabel />
            <Participants />
        </div>
    )
}

export default ParticipantsSection