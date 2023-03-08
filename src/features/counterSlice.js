import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    identity: "",
    isRoomHost: false,
    connectWithOnlyAudio: false,
    roomId: null,
    showOverlay: true,
    participants: [],
    messages: [],
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setRoomHost: (state, action) => {
            console.log(action)
            state.isRoomHost = action.payload
        },
        setConnectAudio: (state, action) => {
            console.log(action)
            state.connectWithOnlyAudio = action.payload
        },
        setRoomId: (state, action) => {
            state.roomId = action.payload
        },
        setIdentity: (state, action) => {
            state.identity = action.payload
        },
        setShowOverlay: (state, action) => {
            state.showOverlay = action.payload
        },
        setParticipants: (state, action) => {
            state.participants = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setParticipants, setShowOverlay, setRoomHost, setConnectAudio, setRoomId, setIdentity, setMessages } = counterSlice.actions


export default counterSlice.reducer