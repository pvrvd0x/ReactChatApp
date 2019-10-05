import React, { useState, useEffect, useRef } from 'react';

import { convertCurrentTime } from 'utils/helpers';

import waveSvg from 'assets/img/wave.svg';
import waveBlackSvg from 'assets/img/waveBlack.svg';
import playSvg from 'assets/img/play.svg';
import pauseSvg from 'assets/img/pause.svg';

const AudioMessage = ({
    audio,
    isMe
}) => {
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
        <div className='message__audio'>
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
                }
                </span>
            </div>
        </div>
    )
}

export default AudioMessage;