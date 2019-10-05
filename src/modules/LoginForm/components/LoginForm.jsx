import React from 'react';
import {Form, Icon, Input} from "antd";
import { Link } from 'react-router-dom';

import {Button, Block} from "components";
import { validateField } from 'utils/helpers';

const LoginForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting,
    } = props;

    return (
        <div>
            <div className="auth__top">
                <h2>Enter account</h2>
                <p>Please enter your account</p>
            </div>
            <Block>
                <Form className="login-form">
                    <Form.Item
                        validateStatus={
                            validateField(touched, errors, 'email')
                        }
                        help={
                            !touched.email ? '' : errors.email || ''
                        }>
                        <Input
                            id='email'
                            size='large'
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="E-mail"
                            values={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                    </Form.Item>
                    <Form.Item
                        validateStatus={
                            validateField(touched, errors, 'password')
                        }
                        help={!touched.password ? '' : errors.password || ''}>
                        <Input
                            id='password'
                            size='large'
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                    </Form.Item>
                    <Form.Item>
                        {isSubmitting && !isValid && <span>Error!</span>}
                        <Button
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                size='large'
                                type='primary'
                                htmlType="submit"
                                className="login-form-button button">
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to='register'
                            className='auth__register-link'>
                            Register
                        </Link>
                    </Form.Item>
                </Form>
            </Block>
        </div>
    );
}

export default LoginForm;