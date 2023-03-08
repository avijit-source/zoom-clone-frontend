import axios from "axios";

const baseUrl = "https://zoom-clone-node.onrender.com/api";
// const baseUrl = "http://localhost:5000/api"
export const getRoomExists = async (roomId) => {
    const response = await axios.get(`${baseUrl}/room-exists/${roomId}`);
    return response.data;
}

export const getTurnCreds = async () => {
    const res = await axios.get(`${baseUrl}/get-turn-credentials`);
    console.log("dataaa", res.data)
    return res.data;
}
