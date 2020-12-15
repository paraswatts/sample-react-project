import React, { useState, Component, useEffect } from 'react';
const { StarRatingComponent } = require('../../../../../../components/ecr/atoms/star-component');
export const DriverDetail = ({
    driver,
    onClose = () => { },
    onAccept = () => { },
    onReject = () => { }
}) => {
    useEffect(() => {
        console.log(driver, 'driver')
    }, [driver])
    return (
        <div className="modal dashboard_popup">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content mt-0">

                    <button type="button" className="close" data-dismiss="modal" onClick={onClose}>
                        <img src={require('../../../../../../assets/icons/cross.png')} width={'14px'} /></button>

                    <div className="modal-body w-100">
                        {driver.status === 6 && <div className="attention-message">
                            <div style={{ marginBottom: '8px' }}><span><strong>Please note:</strong> You will have access to driver's full details once you accept the request and tokens are debited from your account. </span></div>
                            <div><span>By accepting this request you agree with our <a target="_blank" className="terms-link" href="/terms">Terms and Conditions</a>. Tokens will be debited from your account and the relocation request status will be marked as "Booked". If you have only one vehicle available, the listing will become unavailable on the Drivers side website.</span></div>
                        </div>}
                        <ul className="list-unstyled det-striped">
                            <li><span>Driver Ratings: </span><StarRatingComponent readonly={true} initialRating={driver.overallRating} /></li>
                            <li><span>Number of prior Relocations:</span>{driver.overallRelocations}</li>
                            <li><span>Name: </span>{driver.status === 6 ? 'XXXXXXXXXXXX' : driver.name}</li>
                            <li> <span>Email:</span>{driver.status === 6 ? 'XXXXXXXXXXXX' : driver.email}</li>
                            <li><span>Phone:</span> {driver.status === 6 ? 'XXXXXXXXXXXX' : `${driver.phoneNumber.code.includes('+') ? driver.phoneNumber.code : `+${driver.phoneNumber.code}`} ${driver.phoneNumber.phone}`}</li>
                            <li><span>City:</span>{driver.city}</li>
                            {driver.status === 6 && <li className="row align-items-center justify-content-center">
                                <input type="submit" class="btn btn-lg btn-primary text-capitalize m-2" onClick={() => onAccept(driver)} value="Accept Request" />
                                <input type="submit" class="btn btn-lg btn-danger m-2" onClick={() => onReject(driver)} value="Delete Request" />
                            </li>}
                        </ul>
                    </div>

                </div>
            </div>
        </div>)
}