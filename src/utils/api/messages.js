import { axios } from 'core';

const messagesApi = {
    getDialogById: dialogId => axios.get(`/messages/${dialogId}`),
    send: (text, dialogId) => axios.post(`/messages`, {
        text: text,
        dialog: dialogId,
    }),
    removeById: id => axios.delete(`/messages/${id}`),
};

export default messagesApi;