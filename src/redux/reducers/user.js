const windowSessionStorageToken = window.sessionStorage.token === 'undefined' ? undefined : window.localStorage.token;

const initialState = {
    data: null,
    token: windowSessionStorageToken,
    isAuthed: !!windowSessionStorageToken,
};

const user = (state = initialState, {type, payload}) => {
    switch(type) {
        case 'USER:SET_DATA':
            return {
                ...state,
                data: payload,
                isAuthed: true,
                token: window.sessionStorage.token,
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