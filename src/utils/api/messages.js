import { axios } from 'core';

const messagesApi = {
    getDialogById: dialogId => axios.get(`/messages?dialog=${dialogId}`)
};

export default messagesApi;