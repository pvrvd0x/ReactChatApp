import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';

import { userApi } from 'utils/api';
import { Block } from 'components';

const VerifyEmail = ({ location, history }) => {
    const [verified, setVerified] = useState(false),
        [statusMessage, setStatusMessage] = useState(''),
        [status, setStatus] = useState('success');

    useEffect(() => {
        const hash = location.search.split('hash=')[1];

        if (hash) {
            userApi
            .verifyHash(hash)
            .then(({ data }) => {
                setStatus(data.status);

                if (data.status === 'success') {
                    setVerified(true);
                }

                setStatusMessage(data.message);
            })
            .catch(() => {
                setVerified(false);
                setStatus('Error');

                setStatusMessage('Confirmation error');
            })
        }
    })

    return (
        <Block>
            <Result
                status={status}
                title={status.toUpperCase()}
                subTitle={
                    status === 'success' && !verified ?
                    "Please check your email to verify your account"
                    : statusMessage
                }
                extra={
                    status === 'success' && verified &&
                        <Button 
                            onClick={() => {history.push('/login')}}
                            type="primary">
                                Login
                        </Button>}
        />
    </Block>
)};

export default VerifyEmail;