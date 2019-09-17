import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DateInfo, IconChecked, Avatar } from '../';
import { convertCurrentTime } from '../../utils/helpers';

import waveSvg from '../../assets/img/wave.svg';
import waveBlackSvg from '../../assets/img/waveBlack.svg';
import playSvg from '../../assets/img/play.svg';
import pauseSvg from '../../assets/img/pause.svg';

import './Message.scss';

const Message = ({
    user,
    text,
    date,
    isMe,
    isChecked,
    attachments,
    audio,
    isTyping }) => {
    const [ isPlaying, setPlaying ] = useState(false);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ progress, setProgress ] = useState(0);

    const audioElem = useRef(null);

    const togglePlay = () => {
        if (!isPlaying) {
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    }

    useEffect(() => {
        const audioElement = audioElem.current;
        if (audioElement) {
            audioElement.addEventListener('playing', () => {
                setPlaying(true);
            }, false);

            audioElement.addEventListener('ended', () => {
                setPlaying(false);
                setProgress(0);
            }, false);

            audioElement.addEventListener('pause', () => {
                setPlaying(false);
            }, false);

            audioElement.addEventListener('timeupdate', () => {
                const duration = audioElement.duration || 0;
                setCurrentTime(audioElement.currentTime);
                setProgress((audioElement.currentTime / duration) * 100)
            }, false);

            audioElement.addEventListener('loadeddata', () => {
                setCurrentTime(audioElement.duration);
            })
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
                <Avatar user={user}/>
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
                        <div className='message__audio-progress'
                            style={{width: progress + '%'}}/>
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
                                <img src={isMe ? waveBlackSvg : waveSvg} alt="Wave Icon"/>
                            </div>
                            <span className='message__audio-duration'>{
                                convertCurrentTime(currentTime)
                            }</span>
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
    date        : PropTypes.string,
    attachments : PropTypes.array,
    classNames  : PropTypes.string,
    isTyping    : PropTypes.bool,
};

export default Message;