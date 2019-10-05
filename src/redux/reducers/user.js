const windowLocalStorageToken = window.localStorage.token === 'undefined' ? undefined : window.localStorage.token;

const initialState = {
    data: null,
    token: windowLocalStorageToken,
    isAuthed: !!windowLocalStorageToken,
};

const user = (state = initialState, {type, payload}) => {
    switch(type) {
        case 'USER:SET_DATA':
            return {
                ...state,
                user: payload,
                isAuthed: true,
                token: window.localStorage.token,
            };
        case 'USER:SET_IS_AUTHED':
            return {
                ...state,
                isAuthed: payload
            }
        default:
            return state;
    }
}

export default user;