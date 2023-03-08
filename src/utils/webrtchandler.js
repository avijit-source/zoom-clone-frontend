import { setMessages, setShowOverlay } from "../features/counterSlice";
import store from "../features/store"
import * as wss from "./wss"
import Peer from "simple-peer";
import { fetchTURNCredentias, getTurnIceServers } from "./turn";


const defaultConstrains = {
    audio: true,
    video: {
        width: "480",
        height: "360"
    },
}

const onlyAudioConstrains = {
    audio: true,
    video: false
}

let localStream;
export const getLocalPreviewInitRoomConnection
    = async (
        isRoomHost,
        identity,
        roomId = null,
        onlyAudio
    ) => {

        await fetchTURNCredentias()
        console.log("constrains", onlyAudio)

        const constrains = onlyAudio ? onlyAudioConstrains : defaultConstrains;
        console.log(identity, " :identity")
        console.log(roomId, " :roomId")
        navigator.mediaDevices.getUserMedia(constrains).then(stream => {
            console.log("successfully received local stream");
            localStream = stream;
            showeLocalVideoPreview(localStream);
            isRoomHost ? wss.createNewRoom(identity, onlyAudio) : wss.joinRoom(identity, roomId, onlyAudio)
            store.dispatch(setShowOverlay(false))
        }).catch(err => {
            console.log("error occured trying to get an access to localstream");
            console.log(err)
        })
    }


let peers = {}
let streams = []

const getConfigaration = () => {
    const turnIceServers = getTurnIceServers();
    if (turnIceServers) {
        console.log("turnserverfetched");
        console.log(turnIceServers)
        return {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' },
                ...turnIceServers
            ]
        }
    } else {
        return {
            iceServers: [

                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' },
            ],
        }
    }
}

const messengerChannel = "messenger"

export const preparenewPeerConnection = (connUserSocketId, isInitiator) => {
    const configaration = getConfigaration()
    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: configaration,
        stream: localStream,
        channelName: messengerChannel
    })


    peers[connUserSocketId].on("signal", (data) => {
        const signalData = {
            signal: data,
            connUserSocketId,
        }

        wss.signalPeerData(signalData);
    })

    peers[connUserSocketId].on("stream", (stream) => {
        console.log("new stream received");
        addStream(stream, connUserSocketId)
        streams = [...streams, stream]
    })

    peers[connUserSocketId].on("data", (data) => {
        const messageData = JSON.parse(data);
        appendNewMessage(messageData)
    })
}


export const handleSignallingData = (data) => {
    peers[data.connUserSocketId].signal(data.signal)
}

export const removepeerConnection = (data) => {
    const { socketId } = data;

    const videoContainer = document.getElementById(socketId);

    const videoEl = document.getElementById(`${socketId}-video`);

    if (videoContainer && videoEl) {
        const tracks = videoEl.srcObject.getTracks();

        tracks.forEach(t => t.stop());

        videoEl.srcObject = null;

        videoContainer.removeChild(videoEl)

        videoContainer.parentNode.removeChild(videoContainer);

        if (peers[socketId]) {
            peers[socketId].destroy();
        }

        delete peers[socketId]
    }


}



// ui part


const showeLocalVideoPreview = (stream) => {
    const videosContainer = document.getElementById("videos_portal");
    videosContainer.classList.add("videos_portal_styles");

    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video_track_container")

    const videoElement = document.createElement("video");

    videoElement.autoplay = true

    videoElement.muted = true;

    videoElement.srcObject = stream;

    videoElement.onloadedmetadata = () => {
        videoElement.play()
    }

    videoContainer.appendChild(videoElement);

    if (store.getState().counter.connectWithOnlyAudio) {
        videoContainer.appendChild(getAudioOnlylabel())
    }
    videosContainer.appendChild(videoContainer)
}

const addStream = (stream, connUserSocketId) => {
    // display incoming stream
    const videosContainer = document.getElementById("videos_portal");
    const videoContainer = document.createElement("div");

    videoContainer.id = connUserSocketId;

    videoContainer.classList.add("video_track_container");

    const videoElement = document.createElement("video");

    videoElement.autoplay = true;

    videoElement.srcObject = stream;

    videoElement.id = `${connUserSocketId}-video`;
    videoElement.onloadedmetadata = () => {
        videoElement.play()
    }

    videoElement.addEventListener("click", () => {
        if (videoElement.classList.contains("full_screen")) {
            videoElement.classList.remove("full_screen");
        } else {
            videoElement.classList.add("full_screen")
        }
    })



    videoContainer.appendChild(videoElement);


    const participants = store.getState().counter.participants;
    const participant = participants.find(p => p.socketId === connUserSocketId);
    if (participant?.onlyAudio) {
        videoContainer.appendChild(getAudioOnlylabel())
    } else {
        videoContainer.style.position = "static"
    }

    videosContainer.appendChild(videoContainer)


}


const getAudioOnlylabel = () => {
    const labelContainer = document.createElement("div");
    labelContainer.classList.add("label_only_audio_container");
    const label = document.createElement("p");
    label.classList.add("label_only_audio_text");
    label.innerHTML = "Only audio";

    labelContainer.appendChild(label);

    return labelContainer
}


// buttons

export const toggleMic = (isMuted) => {
    localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
}

export const toggleCamera = (isDisabled) => {
    localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
}

export const toggleScreenShare = (isScreenSharingActive, screenSharingStream = null) => {
    if (isScreenSharingActive) {
        console.log("streammmmmm", localStream)
        switchVideoTracks(localStream)
    } else {
        switchVideoTracks(screenSharingStream)
    }
}

export const switchVideoTracks = (stream) => {
    for (let socket_id in peers) {
        for (let index in peers[socket_id].streams[0].getTracks()) {
            for (let index2 in stream.getTracks()) {
                if (
                    peers[socket_id].streams[0].getTracks()[index].kind ===
                    stream.getTracks()[index2].kind
                ) {
                    peers[socket_id].replaceTrack(
                        peers[socket_id].streams[0].getTracks()[index],
                        stream.getTracks()[index2],
                        peers[socket_id].streams[0]
                    );
                    break;
                }
            }
        }
    }
}

const appendNewMessage = (messageData) => {
    const messages = store.getState().counter.messages;
    console.log(messages, "messages")
    store.dispatch(setMessages([...messages, messageData]))
}

export const sendMessageUasingDataChannel = (messageContent) => {
    const identity = store.getState().counter.identity;
    const localMessageData = {
        content: messageContent,
        identity,
        messageCreatedByMe: true
    }
    appendNewMessage(localMessageData)

    const messageData = {
        content: messageContent,
        identity,
    }

    const stringifiedMessage = JSON.stringify(messageData);

    for (let socketId in peers) {
        peers[socketId].send(stringifiedMessage)
    }

}



