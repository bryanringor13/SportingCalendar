import axios from 'axios';
import { API } from '../../config/consts/api';
import { Login, Register, User } from '../metaTypes/user';

export const guestApi = () => {
    return {
        data: {
            token: 'guest',
            userInfo: {
                name: 'Guest',
            }
        }
    }
}

export const updateApi = (data: User) => {
    return axios({
        method: 'put',
        url: `${API.URL}${API.USER}`,
        data: {
            "name" : data.name,
            "email" : data.email,
            "dob" : data.dob,
            "username" : data.username
        },
    });
}

export const loginApi = (data: Login) => {
    return axios({
        method: 'post',
        url: `${API.URL}${API.LOGIN}`,
        data,
    });
};

export const registerApi = (data: Register) => {
    return axios({
        method: 'post',
        url: `${API.URL}${API.REGISTER}`,
        data,
    });
};
