import { notification } from 'antd';

const openNotification = ({ text, title, type = 'info' }) => {
    notification[type]({
        message: title,
        description: text
    })
}

export default openNotification;