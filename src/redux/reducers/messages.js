const initialState = {
    items: [],
    isLoading: false,
};

const messages = (state = initialState, { type, payload }) => {
    switch(type) {
        case 'MESSAGES:SET_ITEMS':
            return {
                ...state,
                items: payload,
                isLoading: false,
            };
        case 'MESSAGES:ADD_MESSAGE':
            return {
                ...state,
                items: [
                    ...state.items,
                    payload
                ]
            }
        case 'MESSAGES:CHANGE_MESSAGE':
            return {
                ...state,
                items: state.items.filter(message => message._id === payload._id ? message.text = payload.text : true)
            }
        case 'MESSAGES:REMOVE_MESSAGE':
            return {
                ...state,
                items: state.items.filter(message => message._id !== payload)
            }
        case 'MESSAGES:SET_IS_LOADING':
            return {
                ...state,
                isLoading: payload,
            };
        default:
            return state;
    }
};

export default messages;