import React, { useState, useEffect } from 'react';
import { StarRatingComponent } from '../../atoms/star-component';
import { DecisionPopup } from '../../atoms/decision-popup'
import './styles.scss';
export const RatingAndComment = ({
    onClose = () => { },
    onChange = () => { },
    initialRating,
    readonly = false,
    commentForEcr = '',
    commentTodriver = '',
    clickedOn = '',
    onSubmit = () => { }
}) => {

    const [newInitialRating, setNewInitialRating] = useState(initialRating)
    const [newCommentForEcr, setNewCommentForEcr] = useState(commentForEcr)
    const [edited, setEdited] = useState(false)
    const [deleteData, setDeleteData] = useState()
    const [newCommentFordriver, setNewCommentFordriver] = useState(commentTodriver)
    const [modalVisibility, setModalVisibility] = useState(false)
    useEffect(() => {
        if (newInitialRating !== initialRating || newCommentForEcr !== commentForEcr || newCommentFordriver !== commentTodriver) {
            setEdited(true)
        }
        else if (newInitialRating === initialRating || newCommentForEcr === commentForEcr || newCommentFordriver === commentTodriver) {
            setEdited(false)
        }
    }, [newInitialRating, newCommentForEcr, newCommentFordriver])

    return (
        <>
            <DecisionPopup
                modalVisibility={modalVisibility}
                dialogTitle={'Close'}
                dialogContent={'Changes you made may not be saved. Do you want to close?'}
                confirmButtonTitle={'Yes'}
                rejectButtonTitle={'No'}
                onConfirmation={() => {
                    setModalVisibility(false)
                    onClose()
                }}
                onRejection={() => {
                    setModalVisibility(false)
                }}
            />
            <div id="myModal" className="modal"
            // onClick={() => {
            //     if (edited)
            //         setModalVisibility(true)
            //     else
            //         onClose()
            // }}
            >
                <div className="modal-content"
                    onClick={e => {
                        e.stopPropagation()
                    }}>
                    <div className='modal_body'>
                        <span className="close"
                            onClick={() => {
                                if (edited)
                                    setModalVisibility(true)
                                else
                                    onClose()
                            }}
                        >&times;</span>
                        <h6 className="mb-0">You can leave a rating about the driver</h6>
                        <div className="my-3"><StarRatingComponent
                            initialRating={newInitialRating}
                            onStarChange={(value) => {
                                setNewInitialRating(value)
                            }}
                            readOnly={false}
                        />
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label>You can leave a comment about the driver - This will be public under the driver's profile</label>
                                <div className="form-group">
                                    <textarea
                                        type='text'
                                        placeholder="Comments"
                                        value={newCommentFordriver}
                                        className={'form-control'}
                                        onChange={
                                            (evt) => {
                                                setNewCommentFordriver(evt.target.value)
                                            }
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <label>You can leave a comment to us about any aspect of the relocation</label>
                                <div className="form-group">
                                    <textarea
                                        type='text'
                                        placeholder="Comments"
                                        value={newCommentForEcr}
                                        className={'form-control'}
                                        onChange={
                                            (evt) => {
                                                setNewCommentForEcr(evt.target.value)
                                            }
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-md-12">
                                <button
                                    type="submit"
                                    disabled={(!edited) || (!newInitialRating) ? true : false}
                                    className="btn btn-primary btn-lg"
                                    onClick={() => {
                                        onSubmit({ commentForECRByAgency: newCommentForEcr, commentForDriver: newCommentFordriver, rateForDriver: newInitialRating })
                                    }}>
                                    {clickedOn === 'rate now' ? "Save" : "Update"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



