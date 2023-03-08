import io from "socket.io-client";
import { setParticipants, setRoomId } from "../features/counterSlice";
import store from "../features/store"
import * as webRTCHandler from "./webrtchandler"

const SERVER = 'https://zoom-clone-node.onrender.com';

let socket = null;

export const connectWithSocket = () => {
    socket = io(SERVER);

    socket.on("connect", () => {
        console.log("successfully connected with socket server");
        console.log(socket.id)


    })

    socket.on("room-id", (data) => {
        const { roomId } = data;
        store.dispatch(setRoomId(roomId));
    })

    socket.on("room-update", (data) => {
        console.log("roomupdate", data)
        const { connectedUsers } = data;
        store.dispatch(setParticipants(connectedUsers))
    })

    socket.on("conn-prepare", (data) => {
        console.log("conn-prepare", data)
        const { connUserSocketId } = data;

        webRTCHandler.preparenewPeerConnection(connUserSocketId, false)

        socket.emit("conn-init", { connUserSocketId })

    })

    socket.on("conn-signal", data => {
        webRTCHandler.handleSignallingData(data)
    })

    socket.on("conn-init", data => {
        const { connUserSocketId } = data;
        webRTCHandler.preparenewPeerConnection(connUserSocketId, true)
    })

    socket.on("user-disconnected", (data) => {
        webRTCHandler.removepeerConnection(data);
    })






}


export const createNewRoom = (identity, onlyAudio) => {
    const data = {
        identity,
        onlyAudio
    }
    socket.emit("create-new-room", data);
}

export const joinRoom = (identity, roomId, onlyAudio) => {
    const data = {
        roomId,
        identity,
        onlyAudio
    }

    console.log(data, "dataaaaaaaa")
    socket.emit("join-room", data)
}

export const signalPeerData = (data) => {
    socket.emit("conn-signal", data);

}
