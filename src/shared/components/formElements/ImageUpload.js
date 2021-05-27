import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import { UploadSvg } from '../../../assets/svgs/svgs';
import './ImageUpload.css';

const ImageUpload = props => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input
                type="file"
                id={props.id}
                ref={filePickerRef}
                style={{display: 'none'}}
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview" style={!previewUrl ? {width: '100%'} : {width: '13rem', margin: '1rem auto'}}>
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <React.Fragment>
                        <div onClick={pickImageHandler}>
                            <UploadSvg />
                        </div>
                        <p style={{whiteSpace: 'nowrap', fontSize: '15px'}}>Drag and drop a photo or <span style={{color: '#1e90ff', cursor: 'pointer'}} onClick={pickImageHandler}>Upload</span> it.</p>
                    </React.Fragment>}
                </div>
                {previewUrl && <Button grayBg type="button" onClick={pickImageHandler}>Upload new image</Button> }
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;