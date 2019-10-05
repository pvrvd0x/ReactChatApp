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
        userApi.getMe().then(({ data }) => {
            dispatch(actions.setUserData(data));
        })
    },
    fetchUserRegister: postData => dispatch => {
        return userApi
                    .register(postData)
                    .then(({ data }) => {
                        if (data.status === 'success') {
                            dispatch(actions.setUserData(data));

                            notification.open({
                                message: 'User successfully created',
                                icon: <Icon type="check-circle" style={{ color: '#52c41a' }}/>
                            })
                        } else {
                            notification.open({
                                message: 'Registration Failed',
                                description: 'User with this email already exists',
                                icon: <Icon type="close-circle" style={{ color: '#f5222d' }}/>
                            })
                        }
                        return data;
                    })
    },
    fetchUserLogin: postData => dispatch => {
        return userApi
                    .login(postData)
                    .then(({ data }) => {
                        if (data.status === 'success') {
                            dispatch(actions.setUserData(data));

                            notification.open({
                                message: 'Login Successful',
                                icon: <Icon type="check-circle" style={{ color: '#52c41a' }} />,
                            })

                            window.axios.defaults.headers.common['token'] = data.token;
                            window.localStorage['token'] = data.token;
                            dispatch(actions.fetchUserData());
                            dispatch(actions.setIsAuthed(true));
                        } else {
                            notification.open({
                                message: 'Login Failed',
                                description: 'Error in email or password',
                                icon: <Icon type="close-circle" style={{ color: '#f5222d' }}/>
                            })
                        }

                        return data;
                    })
    }
};

export default actions;