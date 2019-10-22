import React, {useEffect, useState} from 'react';
import { Upload, Modal } from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const FilesUploader = ({ attachments }) => {
    const [state, setState] = useState({
        previewVisible: false,
        previewImage: "",
        fileList: attachments
    });

    useEffect(() => {
        setState({
            ...state,
            fileList: attachments,
        });
    }, [attachments]);

    const handleCancel = () => setState({...state, previewVisible: false});

    const handlePreview = async file => {
        console.log(file);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originalFileObj);
        }

        setState({
            ...state,
            previewImage: file.url || file.preview,
            previewVisible: true,
        })
    };

    const handleChange = ({ fileList }) => setState({ fileList });

    return (
        <div className="clearfix">
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={state.fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
            </Upload>
            <Modal visible={state.previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
            </Modal>
        </div>
    )
};

export default FilesUploader;