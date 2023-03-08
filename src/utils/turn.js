import * as api from "./api";

let TURNIceServers = null;

export const fetchTURNCredentias = async () => {
    const resData = await api.getTurnCreds();
    if (resData.token?.iceServers) {
        TURNIceServers = resData.token.iceServers
    }
    return TURNIceServers
}

export const getTurnIceServers = () => {
    return TURNIceServers
}