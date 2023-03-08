import React from 'react'
import { useSelector } from 'react-redux';


const dummyParticipants = [
    {
        identity: "Jake"
    },
    {
        identity: "Jake"
    },
    {
        identity: "Jake"
    },
    {
        identity: "Jake"
    },
    {
        identity: "Jake"
    },
    {
        identity: "Jake"
    },
    {
        identity: "Jake"
    },
]

const SingleParticipant = (props) => {
    const { identity, lastItem, participant } = props;

    return <>
        <p className="participants_paragraph">{identity}</p>
        {!lastItem && <span className="participants_separator_line">

        </span>}
    </>

}
function Participants() {
    const { participants } = useSelector((state) => state.counter)

    return (
        <div className='participants_container'>
            {participants && participants.map((p, i) => (
                <SingleParticipant key={p.identity}
                    lastItem={participants?.length === i + 1}
                    participant={p}
                    identity={p.identity}
                />
            ))}
        </div>
    )
}

export default Participants