import React from 'react';
import { Form, Icon, Input } from "antd";
import { Button, Block } from "../../../components";
import { Link } from 'react-router-dom';

import { validateField } from '../../../utils/helpers';

const RegisterForm = props => {
    const success = true;

    const  {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <div>
            <div className="auth__top">
                <h2>Register New Account</h2>
                <p>Please fill in these fields</p>
            </div>
            <Block>
                { success ?
                <Form className="register-form">
                    <Form.Item
                        validateStatus={
                            validateField(touched, errors, 'email')
                        }
                        hasFeedback
                        help={!touched.email ? '' : errors.email || ''}>
                        <Input
                            id='email'
                            size='large'
                            prefix={<Icon type='mail' style={{color: 'rgba(0, 0, 0, .25)'}}/>}
                            placeholder='Email'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            size='large'
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        validateStatus={
                            !touched.password ? '' : errors.password ? 'error' : 'success'
                        }
                        hasFeedback
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
                    <Form.Item
                        validateStatus={
                            !touched.repassword ? '' : errors.repassword ? 'error' : 'success'
                            }
                            hasFeedback
                            help={!touched.repassword ? '' : errors.repassword ? errors.repassword : ''}>
                        <Input
                            id='repassword'
                            size='large'
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type='password'
                            placeholder='Repeat Password'
                            value={values.repassword}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                                onClick={handleSubmit}
                                size="large"
                                type="primary"
                                htmlType="submit"
                                className="button login-form-button">
                            Create new account
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to='login'
                              className='auth__register-link'>
                            Log in
                        </Link>
                    </Form.Item>
                </Form>
                    : <div className="auth__success-block">
                        <div>
                            <Icon
                                style={{fontSize: 50}}
                                type='info-circle'
                                theme='twoTone'/>
                        </div>
                        <h3>Confirm your profile</h3>
                        <p>An email with confirmation link has benn sent to your email</p>
                    </div> }
            </Block>
        </div>
    );
};

export default RegisterForm;