import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { reset } from "redux-form";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../../config/default`);
const { DecisionPopup } = require(`../../../../../../../components/${PLATFORM}/atoms/decision-popup`);
const { STRINGS } = require(`../../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { SnackbarWrapper } = require(`../../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);

export const Screen = ({
    setPopCancelTrip,
    popupCancelTrip,
    cancelTripByDriver,
    upcomingActiveRowData,
    getDriverTrips,
    getCancelledTrips,
    tripIndex,
    getDriverUpcomingTripList,
    tableIndex
}) => {
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [openSnackBar, setOpenSnackbar] = useState(false);

    const updateTable = () => {
        let postData
        // console.log(getDriverUpcomingTripList)
        postData = { limit: 5, index: 0 }
        tableIndex({ ...tripIndex, upcoming: 0 })

        let upcomingTripReq = Object.keys(postData)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(postData[k])
            ).join('&');
        getDriverTrips(upcomingTripReq, (response) => {

        }, (error) => { })

        getCancelledTrips(upcomingTripReq, (response) => {

        }, (error) => { })
    }
    return (
        <>
        <SnackbarWrapper
            visible={openSnackBar}
            onClose={() => setOpenSnackbar(false)}
            variant={snackbarData.variant}
            message={snackbarData.message}
        />
        <DecisionPopup
            modalVisibility={popupCancelTrip}
            dialogContent={STRINGS.CANCEL_TRIP_NOTIFICATION}
            dialogTitle={STRINGS.CANCEL_TRIP_CONTENT}
            confirmButtonTitle={STRINGS.CONFIRM}
            rejectButtonTitle={STRINGS.CANCEL}
            toggleDialogModal={() => setPopCancelTrip(!popupCancelTrip)}
            onConfirmation={() => {
                let postData = { id: upcomingActiveRowData._id, status: { status: 4 } }
                cancelTripByDriver(postData, (response) => {
                    setSnackBarData({
                        variant: response.status ? 'success' : 'error',
                        message: 'Trip Cancelled Successfully'
                    });
                    setOpenSnackbar(true)
                    setTimeout(() => {
                        setPopCancelTrip(false)
                        updateTable()
                    }, 1500);
                },
                    (error) => {
                        setSnackBarData({
                            variant: error.status ? 'success' : 'error',
                            message: error.msg
                        });
                        setOpenSnackbar(true)
                        setTimeout(() => {
                            setPopCancelTrip(false)
                        }, 1500);
                    }
                );
            }}
            onRejection={() => setPopCancelTrip(false)} />

        </>
    )
}