import { dialogsApi } from "utils/api";

const actions = {
    setDialogs: items => ({
        type: 'DIALOGS:SET_ITEMS',
        payload: items,
    }),
    setCurrentDialogId: id => {
        if (window.innerWidth <= 480)
            document.querySelector('.chat').style.transform = 'translateX(-50%)';

        return {
            type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
            payload: id,
        }
    },
    fetchDialogs: () => dispatch => {
        dialogsApi.getAll().then(({ data }) => {
            dispatch(actions.setDialogs(data));
        });
    }
};

export default actions;