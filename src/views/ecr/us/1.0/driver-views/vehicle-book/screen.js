import React, { useState, useEffect } from "react";
import './styles.scss';
import { useHistory, useLocation } from "react-router-dom";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { ROUTES } = require(`../../../../../../shared/${PLATFORM}/constants`);
export const SuccessfulBooking = () => {
    let history = useHistory();
    return (
        <div className="container">
            <div className="ride_book d-flex align-items-center justify-content-center">
                <div className="text-center py-2">
                    <i><img src={require(`../../../../../../assets/driver/icons/vehicle-home.svg`)} alt="ECR" className="img-fluid" width="180px" /></i>
                    <h5 className="mt-4 mb-3">Thanks for completing your <br/> booking request with us</h5>
                 
                </div>
            </div>
        <div className="title_loc text-center mt-5">
            <h5>What to expect from here:</h5>
        </div>
        <div className="row align-items-start justify-content-center vehicle_summ">
            <div className="col-md-4">
                <div className="loc_block text-center">
                    <i> <img src={require(`../../../../../../assets/agency/icons/sendit.png`)} alt="ECR" class="img-fluid"  /></i>
                    <span>Your booking request will be sent to the rental vehicle agency</span>				
                </div>
            </div>
            <div className="col-md-4">
                <div className="loc_block text-center">
                    <i><img src={require(`../../../../../../assets/agency/icons/time.png`)} alt="ECR" class="img-fluid" /></i>
                    <span>Within 24 to 48 hrs you should hear back from the agency confirming your booking</span>				
                </div>
            </div>
            <div className="col-md-4">
                <div className="loc_block text-center">
                    <i><img src={require(`../../../../../../assets/agency/icons/deal-done.png`)} alt="ECR" class="img-fluid" /></i>
                 
                    <span>If your booking has been approved, great! In case it has been declined, please feel free to browse again for other options</span>				
                </div>
            </div>
        </div>
            <div className="d-flex align-items-center justify-content-center mb-5">
                <a className="btn btn-lg btn-secondary text-uppercase text-white" onClick={() => {
                history.replace(ROUTES.DASHBOARD)
            }}>Go to home </a>
            </div>
    </div>    )
}