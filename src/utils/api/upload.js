import { axios } from 'core';

const uploadApi = {
    upload: file => {
        const formData = new FormData();

        formData.append('file', file);
        console.log(file);
        return axios.post('/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
};

export default uploadApi;