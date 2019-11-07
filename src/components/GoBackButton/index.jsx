import React from 'react';
import { Button, Icon } from 'antd';

const GoBackButton = () => {
    const handleClick = () => {
        document.querySelector('.chat').style.transform = 'translateX(0)';
    };

    return (
        <Button type='link' shape='circle' icon="left" onClick={handleClick} style={{color: '#999', fontSize: 22}}/>
    )
};

export default GoBackButton;