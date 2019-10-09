import {userApi} from 'utils/api';
import { notification, Icon } from 'antd';
import React from 'react';

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
    fetchUserRegister: postData => {
        return userApi
                    .register(postData)
                    .then(({ data }) => {
                        return data;
                    })
                    .catch(() => {
                        notification.open({
                            message: 'Registration Failed',
                            description: 'User with this email already exists',
                            icon: <Icon type="close-circle" style={{ color: '#f5222d' }}/>
                        })
                    });
    },
    fetchUserLogin: postData => dispatch => {
        return userApi
                    .login(postData)
                    .then(({ data }) => {
                        const { token } = data;
                        
                        dispatch(actions.setUserData(data));

                        notification.open({
                            message: 'Login Successful',
                            icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
                        })

                        window.axios.defaults.headers.common['token'] = token;
                        window.localStorage['token'] = token;
                        dispatch(actions.fetchUserData());
                        dispatch(actions.setIsAuthed(true));

                        return data;
                    })
                    .catch(() => {
                        notification.open({
                            message: 'Login Failed',
                            description: 'Error in email or password',
                            icon: <Icon type="close-circle" style={{ color: '#f5222d' }}/>
                        })
                    })
    }
};

export default actions;