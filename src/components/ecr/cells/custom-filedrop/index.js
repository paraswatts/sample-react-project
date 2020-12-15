import React, { useState } from "react";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import './style.scss';

export const CustomFileDrop = ({
    params,
    fileUploader = () => { },
    vehicleImages = [],
    closeUploadder = () => { },
    nonUpload
}) => {

    const handleChangeStatus = ({ meta }, status) => {
    }


    const handleSubmit = async (files, allFiles) => {
        closeUploadder(files, allFiles)
    }

    return (
        <>
            {
                vehicleImages && vehicleImages.length === 10 ? (
                    <div className="d-flex align-items-center justify-content-center w-100 drag_drop_option full">
                        <i><img src={nonUpload} alt={'non-upload-icon'} /></i>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h5>{`Delete some images to add new`}</h5>
                            <h6>{`${10 - vehicleImages.length} ${vehicleImages.length === 9 ? `File` : `Files`} remaining.`}</h6>
                            <p>{'File should be 16MB max.'}</p>
                        </div>
                    </div>) : (
                        <Dropzone
                            maxSizeBytes={16 * 1000000}
                            onChangeStatus={handleChangeStatus}
                            onSubmit={handleSubmit}
                            maxFiles={`${10 - vehicleImages.length}`}
                            inputContent={(props) => {
                                return (
                                    <div className="d-flex align-items-center justify-content-center w-100 drag_drop_option">
                                        <i><img src={nonUpload} alt={'non-upload-icon'} /></i>
                                        <div {...props} key={props} className="d-flex flex-column justify-content-center align-items-center">
                                            <h5>{`Drag & drop or Browse file you want to upload`}</h5>
                                            <h6>{`${10 - vehicleImages.length} ${vehicleImages.length === 9 ? 'File' : 'Files'} remaining.`}</h6>
                                            <p>{'File should be 16MB max.'}</p>
                                        </div>
                                    </div>)
                            }}
                            onSubmit={handleSubmit}
                            submitButtonContent={() => <button
                                className='dzu-submitButton'
                                type="button" onClick={(e) => { e.preventDefault() }
                                    // handleChangeStatus
                                }>Submit</button>}
                            accept={"image/*"}
                            inputWithFilesContent={files => `${10 - (vehicleImages.length + files.length)} more`}
                        // submitButtonDisabled={files => files.length < 3}
                        />
                    )
            }

        </>
    );
}
