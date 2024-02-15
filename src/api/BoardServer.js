import axios from "axios"

export default class BoardServer {
    static async getAll() {
        const response = await axios.get("https://65c73b49e7c384aada6e4d98.mockapi.io/api/v1/board")
        return response
    }
    static async getById(id) {
        const response = await axios.get('https://65c73b49e7c384aada6e4d98.mockapi.io/api/v1/board/' + id)
        return response;
    }
}