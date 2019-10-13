import { axios } from 'core';

const messagesApi = {
    getDialogById: dialogId => axios.get(`/messages/${dialogId}`),
    send: (text, dialogId) => console.log(text, dialogId) || axios.post(`/messages`, {
        text: text,
        dialog: dialogId,
    })
};

export default messagesApi;