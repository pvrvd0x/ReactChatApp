import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import { messagesActions, attachmentsActions } from 'redux/actions';
import { ChatInput as ChatInputBase } from 'components';
import { uploadApi } from "utils/api";

const ChatInput = ({ 
    fetchMessageSend,
    setAttachments,

    dialogs: { currentDialogId },
    attachments,
}) => {
    const [value, setValue] = useState(''),
        [emojiTabIsActive, setEmojiTabIsActive] = useState(false);

    const toggleEmojiTab = () => {
        setEmojiTabIsActive(!emojiTabIsActive);
    };

    const handleSendMessage = (e) => {
        if (e.keyCode === 13 || e.type === 'click') {
            fetchMessageSend(value, currentDialogId);
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

    const handleFileUpload = async files => {
        let uploaded = attachments;
        console.log(uploaded);
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