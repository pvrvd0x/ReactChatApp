import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DateInfo, IconChecked } from '../';

import waveSvg from '../../assets/img/wave.svg';
import playSvg from '../../assets/img/play.svg';
import pauseSvg from '../../assets/img/pause.svg';

import './Message.scss';

const Message = ({
    avatar,
    text,
    date,
    isMe,
    isChecked,
    attachments,
    audio,
    isTyping }) => {
    const [ isPlaying, setPlaying ] = useState(false);

    const audioElem = useRef(null);

    const togglePlay = () => {
        if (!isPlaying) {
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    }

    useEffect(() => {
        if (audioElem.current) {
            audioElem.current.addEventListener('playing', () => {
                setPlaying(true);
            }, false);

            audioElem.current.addEventListener('ended', () => {
                setPlaying(false);
            }, false);

            audioElem.current.addEventListener('pause', () => {
                setPlaying(false);
            }, false);
        }
    }, []);

    return (
    <div className={classNames('message', {
        'message--isme'     : isMe,
        'message--is-typing': isTyping,
        'message--is-audio' : audio,
        'message--image'    : attachments && attachments.length === 1})}>
        <div className="message__content">
            <IconChecked isMe={isMe} isChecked={isChecked}/>
            <div className="message__avatar">
                <img src={avatar} alt={`User`}/>
            </div>
            <div className="message__info">
                { (audio || (!attachments || (attachments && (attachments.length !== 1)))) &&
                <div className="message__bubble">
                    { text && <p className='message__text'>{text}</p> }
                    { isTyping && <div className="message__typing">
                        <span className="dot one"/>
                        <span className="dot two"/>
                        <span className="dot three"/>
                    </div> }
                    { audio && <div className='message__audio'>
                        <audio ref={audioElem} src={audio} preload='auto'/>
                        <div className="message__audio-progress"></div>
                        <div className="message__audio-info">
                            <div className="message__audio-btn">
                                <button onClick={togglePlay}>
                                    { isPlaying ?
                                        <img src={pauseSvg} alt="Pause Icon"/>
                                        : <img src={playSvg} alt="Play Icon"/>
                                    }
                                </button>
                            </div>
                            <div className='message__audio-wave'>
                                <img src={waveSvg} alt='wave'/>
                            </div>
                            <span className='message__audio-duration'>00:05</span>
                        </div>
                    </div>}
                </div>
                }
                    {attachments && 
                    <div className="message__attachments">
                        {attachments.map(item => (
                            <div 
                                key={Math.random()}
                                className='message__attachments-item'>
                                <img src={item.url} alt={item.filename}/>
                            </div>
                        ))}
                    </div>}
                <span className="message__date">
                    <DateInfo date={date}/>
                </span>
            </div>
        </div>
    </div>
)};

Message.propTypes = {
    avatar      : PropTypes.string,
    text        : PropTypes.string,
    date        : PropTypes.object,
    attachments : PropTypes.array,
    classNames  : PropTypes.string,
    isTyping    : PropTypes.bool,
};

export default Message;