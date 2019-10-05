import {axios} from 'core';

const userApi = {
    login: postData => axios.post('/user/login', postData),
    getMe: () => axios.get('/user/me'),
    register: postData => axios.post('/user/register', postData),
};

export default userApi;