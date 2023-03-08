import axios from "axios";

const baseUrl = "http://localhost:5000/api";

export const getRoomExists = async (roomId) => {
    const response = await axios.get(`${baseUrl}/room-exists/${roomId}`);
    return response.data;
}

export const getTurnCreds = async () => {
    const res = await axios.get(`${baseUrl}/get-turn-credentials`);
    return res.data;
}