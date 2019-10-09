import React from 'react';
import PropTypes from 'prop-types';
import { generateAvatarFromHash } from 'utils/helpers';

import './avatar.scss';

const Avatar = ({ user }) => {
    if (user.avatar) {
        return (
            <img
                src={user.avatar}
                alt={`${user.fullname} avatar`}/>
        )
    } else {
        const color = generateAvatarFromHash(user._id),
            firstCharOfName = user.fullname[0];

        return (
            <div className='avatar avatar--empty'
                style={{
                    background: `linear-gradient(135deg, ${color.color}, ${color.colorLighten} 96%)`
                }}>
                { firstCharOfName }
            </div>
        )
    }
}

Avatar.propTypes = {
    user: PropTypes.object,
};

export default Avatar;