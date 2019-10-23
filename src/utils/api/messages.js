import { axios } from 'core';

const messagesApi = {
    getDialogById: dialogId => axios.get(`/messages/${dialogId}`),
    send: (text, dialogId, attachments = []) => axios.post(`/messages`, {
        text: text,
        dialog: dialogId,
        attachments
    }),
    removeById: id => axios.delete(`/messages/${id}`),
};

export default messagesApi;