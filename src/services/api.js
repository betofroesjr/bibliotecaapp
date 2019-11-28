import axios from 'axios';
const api = axios.create({
    baseURL: 'http://192.168.1.66:8080/'
});
export default api;