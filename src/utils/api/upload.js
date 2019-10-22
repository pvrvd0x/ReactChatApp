import { axios } from 'core';

const uploadApi = {
    upload: file => {
        console.log(file);
        const formData = new FormData();
        
        formData.append('image', file);
        
        return axios.post('/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
};

export default uploadApi;