import { messagesApi } from 'utils/api';

const messagesActions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items,
    }),
    addMessage: message => (dispatch, getState) => {
        const { dialogs } = getState(),
                { currentDialogId } = dialogs;
        
        if (currentDialogId === message.dialog._id) {
            dispatch({
                type: 'MESSAGES:ADD_MESSAGE',
                payload: message
            })
        }
    },
    setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool,
    }),
    removeMessageById: messageId => dispatch => {
        console.log(`Remove request for: ${messageId}`);
        messagesApi
            .removeById(messageId)
            .then(() => {
                dispatch({
                    type: 'MESSAGES:REMOVE_MESSAGE',
                    payload: messageId
                })
            })
            .catch(() => {
                dispatch(messagesActions.setIsLoading(false));
            })
    },
    fetchMessageSend: (text, dialogId, attachments) => dispatch => {
        messagesApi.send(text, dialogId, attachments)
    },
    fetchMessages: dialogId => dispatch => {
        dispatch(messagesActions.setIsLoading(true));

        messagesApi
            .getDialogById(dialogId)
            .then(({data}) => {
                dispatch(messagesActions.setMessages(data));
            })
            .catch(() => {
                dispatch(messagesActions.setIsLoading(false));
            })
    }
};

export default messagesActions;