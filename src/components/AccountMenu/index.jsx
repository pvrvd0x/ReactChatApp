import React from 'react';
import { Popover, Button } from 'antd';


const AccountMenu = ({
    userName,
    isVisible
}) => {
    return (
        <Popover
            className='account-menu'
            title={userName}
            trigger='click'
            visible={isVisible}
            placement='bottom'
            content={
                <Button type='danger' onClick={() => {window.localStorage.clear(); window.location.reload()}}>Log Out</Button>
            }
        />
    )
};

export default AccountMenu;