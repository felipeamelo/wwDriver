import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://192.168.0.101:3333',
    baseURL: 'https://wwdriver-backend.herokuapp.com',
})

export default api;