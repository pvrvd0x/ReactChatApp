import { axios } from 'core';

const messagesApi = {
    getDialogById: dialogId => axios.get(`/messages/${dialogId}`)
};

export default messagesApi;