import axios from 'axios';
import { API } from '../../config/consts/api';

export const eventsApi = (token: string) => {
    return axios({
        method: 'get',
        url: `${API.URL}${API.EVENTS}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const eventApi = ({ token, id } : any) => {
    return axios({
        method: 'get',
        url: `${API.URL}${API.EVENTS}/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};