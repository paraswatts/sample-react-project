
import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import './style.scss';
const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../config/default`);

const { RateAgency } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/profile-account/rate-agency/index`)
const { EmailAgency } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/profile-account/email-agency/index`)
const { ViewComment } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/profile-account/view-comment/index`)

export const DialogModal = ({
    modalVisibility,
    dialogContent,
    dialogTitle,
    toggleDialogModal = () => { },
    onRejection = () => { },
    modalType,
    activeRow,
    upcomingActiveRowData
}) => {
    useEffect(() => {
    }, [dialogContent])
    return (
        <Dialog
            open={modalVisibility}
            onClose={toggleDialogModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            className={modalType && modalType === 'rateAgency' || modalType && modalType === 'emailAgency'
                || modalType && modalType === 'Comment' ? '' : "lg-modal"}
        >
            <DialogTitle id="alert-dialog-title">{dialogTitle}
                <IconButton aria-label="close" onClick={onRejection}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {dialogContent && modalType && modalType === 'Comment' ?
                    <ViewComment content={dialogContent} />
                    : modalType && modalType === 'rateAgency' ?
                        <RateAgency agencyName={dialogContent} activeRow={activeRow && activeRow} getResponse={() => toggleDialogModal(false)} />
                        : modalType && modalType === 'emailAgency' ?
                            <EmailAgency upcomingActiveRowData={upcomingActiveRowData} getResponse={() => toggleDialogModal(false)} />
                            : modalType && modalType === 'ImageSlider' ? <Carousel >
                                {dialogContent && dialogContent.map((image, index) => {
                                    return <div key={index}>
                                        <img src={image.url} />
                                    </div>
                                })}
                            </Carousel> : dialogContent}

            </DialogContent >
        </Dialog >

    );
}