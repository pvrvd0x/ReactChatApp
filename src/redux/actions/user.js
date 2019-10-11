import {userApi} from 'utils/api';
import {openNotification} from 'utils/helpers';

const actions = {
    setUserData: data => ({
        type: 'USER:SET_DATA',
        payload: data
    }),
    setIsAuthed: bool => ({
        type: 'USER:SET_IS_AUTHED',
        payload: bool,
    }),
    fetchUserData: () => dispatch => {
        userApi
            .getMe()
            .then(({ data }) => {
                dispatch(actions.setUserData(data));
            })
            .catch(err => {
                if (err.response.status === 403) {
                    dispatch(actions.setIsAuthed(false));
                    delete window.localStorage.token;
                }
            });
    },
    fetchUserRegister: postData => dispatch => {
        return userApi.register(postData)
    },
    fetchUserLogin: postData => dispatch => {
        return userApi
                    .login(postData)
                    .then(({ data }) => {
                        const { token } = data;
                        
                        dispatch(actions.setUserData(data));

                        openNotification({
                            title: 'success',
                            type: 'success'
                        })

                        window.axios.defaults.headers.common['token'] = token;
                        window.localStorage['token'] = token;
                        dispatch(actions.fetchUserData());
                        dispatch(actions.setIsAuthed(true));

                        return data;
                    })
                    .catch(() => {
                        openNotification({
                            title: 'Login Failed',
                            text: 'Error in email or password',
                            type: 'error'
                        })
                    })
    }
};

export default actions;