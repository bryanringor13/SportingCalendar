import axios from 'axios';
import { API } from '../../config/consts/api';

export const venueApi = (payload: any) => {
    return axios({
        method: 'get',
        url: `${API.URL}${API.VENUES}/${payload.venue_id}`,
        headers: {
            'Authorization': `Bearer ${payload.token}`
        }
    });
};