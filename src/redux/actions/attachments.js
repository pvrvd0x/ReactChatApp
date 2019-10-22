const actions = {
    setAttachments: items => ({
        type: "ATTACHMENTS:SET_ITEMS",
        payload: items
    }),
    removeAttachment: file => ({
        type: "ATTACHMENTS:REMOVE_FILE",
        payload: file
    })
};

export default actions;