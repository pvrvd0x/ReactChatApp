import { messagesApi } from 'utils/api';

const messagesActions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items,
    }),
    setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool,
    }),
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