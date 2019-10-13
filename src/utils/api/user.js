import {axios} from 'core';

const userApi = {
    login: postData => axios.post('/user/login', postData),
    getMe: () => axios.get('/user/me'),
    verifyHash: hash => axios.get(`/user/verify?hash=${hash}`),
    register: postData => axios.post('/user/register', postData),
    findUsers: query => axios.get(`/user/find?query=${query}`)
};

export default userApi;