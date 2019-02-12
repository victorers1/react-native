import Axios from 'axios'

const api = Axios.create({
    baseURL: 'http://69.55.59.66/indexapi/'
});

export default api;