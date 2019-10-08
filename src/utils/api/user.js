import {axios} from 'core';

const userApi = {
    login: postData => axios.post('/user/login', postData),
    getMe: () => axios.get('/user/me'),
    verifyHash: hash => axios.get(`/user/verify?hash=${hash}`),
    register: postData => axios.post('/user/register', postData),
};

export default userApi;