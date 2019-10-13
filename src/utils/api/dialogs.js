import { axios } from 'core';

const dialogsApi = {
    getAll: () => axios.get('/dialogs'),
    create: ({partnerId, text}) => axios.post('/dialogs', {
        partner: partnerId,
        text: text
    }),
};

export default dialogsApi;