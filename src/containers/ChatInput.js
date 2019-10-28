import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import { messagesActions, attachmentsActions } from 'redux/actions';
import { ChatInput as ChatInputBase } from 'components';
import { uploadApi } from "utils/api";

const ChatInput = ({
    fetchMessageSend,
    setAttachments,
    removeAttachment,
    dialogs: { currentDialogId },
    attachments,
}) => {
    window.navigator.getUserMedia = (window.navigator.getUserMedia ||
        window.navigator.mozGetUserMedia ||
        window.navigator.msGetUserMedia ||
        window.navigator.webkitGetUserMedia);

    const [value, setValue] = useState(''),
        [emojiTabIsActive, setEmojiTabIsActive] = useState(false),
        [isRecording, setIsRecording] = useState(false),
        [mediaRecorder, setMediaRecorder] = useState(null);

    const toggleEmojiTab = () => {
        setEmojiTabIsActive(!emojiTabIsActive);
    };

    const handleSendMessage = (e) => {
        if (e.keyCode === 13 || e.type === 'click') {
            if (attachments && attachments.length) {
                fetchMessageSend(value, currentDialogId, attachments.map(item => item.uid));
                setAttachments([]);
            } else if (value) {
                fetchMessageSend(value, currentDialogId);
            }
            setValue('');
        }
    };

    const handleEmojiSelect = ({ colons }) => {
        setValue((value + " " + colons).trim());
    };

    const handleOutsideClick = (el, e) => {
        if (el && !el.contains(e.target)) {
            setEmojiTabIsActive(false);
        }
    };

    const onRecord = () => {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true }, onRecording, onError)
        }
    };

    const onHideRecording = () => {
        setIsRecording(false);
    };

    const onRecording = stream => {
        const recorder = (new MediaRecorder(stream));
        setMediaRecorder(recorder);

        recorder.start();

        recorder.onstart = () => {
            setIsRecording(true);
        };

        recorder.onstop = () => {
            setIsRecording(false);
        };

        recorder.ondataavailable = e => {
            const audioURL = window.URL.createObjectURL(e.data);
            new Audio(audioURL).play().then(res => console.log(res));
        }
    };

    const onError = err => {
        console.log('Error: ' + err);
    };

    const handleFileUpload = async files => {
        let uploaded = attachments;
        for (const file of files) {
            const uid = Math.round(Math.random() * 1000);

            uploaded = [
                ...uploaded,
                {
                    uid: uid,
                    name: file.name,
                    status: 'uploading'
                }];

            setAttachments(uploaded);

            await uploadApi
                .upload(file)
                .then(({ data }) => {
                    uploaded = uploaded.map(item => {
                        if (item.uid === uid) {
                            return {
                                status: 'done',
                                uid: data.file._id,
                                name: data.file.filename,
                                url: data.file.url,
                            };
                        }
                        return item;
                    })
                })
                .catch(() => {
                    return {
                        status: 'error'
                    }
                })
        }
        setAttachments(uploaded);
    };

    useEffect(() => {
        const emojiTabButton = document.querySelector('.chat-input__smile-btn');

        document.addEventListener('click', handleOutsideClick.bind(this, emojiTabButton));

        return () => {
            document.addEventListener('click', handleOutsideClick.bind(this, emojiTabButton));
        }
    });

    if (!currentDialogId) {
        return null;
    }

    return (
        <ChatInputBase
            toggleEmojiTab={toggleEmojiTab}
            emojiTabIsActive={emojiTabIsActive}
            setValue={setValue}
            value={value}
            handleEmojiSelect={handleEmojiSelect}
            handleSendMessage={handleSendMessage}
            handleFileUpload={handleFileUpload}
            attachments={attachments}
            removeAttachment={removeAttachment}
            isRecording={isRecording}
            onRecord={onRecord}
            onStopRecording={onHideRecording}
        />
    )
};

export default connect(
    ({dialogs, attachments}) => ({
        dialogs,
        attachments: attachments.items
    }),
    {...messagesActions, ...attachmentsActions}
)(ChatInput);