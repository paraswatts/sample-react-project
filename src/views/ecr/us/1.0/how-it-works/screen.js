import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../../config/default`);
const { startLoader, stopLoader, getFaq } = require(`../../../../../redux/${PLATFORM}/actions`);
const { VEHICLE_HOME_ICON, DRIVER_ICON } = require(`../../../../../shared/${PLATFORM}/constants`)
export const Screen = () => {

    return (
        <div className="how_it_works_sec vehical_head">
            <div className="container">
                <div className="col-md-7 mx-auto">
                    <div className="my-5">
                        <h5>Great to see you here!</h5>
                    </div>
                    <div className="row align-items-center justify-content-center mt-4">
                        <div className="row align-items-start mb-5">
                            <div className="col-md-2"> <i><img src={VEHICLE_HOME_ICON} alt="ECR" className="img-fluid" /></i>
                            </div>
                            <div className="col-md-10">
                                <h5>How relocation works:</h5>
                                <p>Vehicle relocation is a great opportunity to save on your travels. Rental vehicle companies usually need to move vehicles between cities and sometimes between islands. With that, vehicles are offered here at for free or at a low rate and you can request one to be relocated from the origin city to the destination city. Some relocation options will include fuel and ferry cost but others won’t. You will find details on each listing. Don’t wait, book your relocation vehicle today and save</p>
                            </div>
                        </div>
                        <div className="row align-items-start mb-5">
                            <div className="col-md-2">
                                <i><img src={DRIVER_ICON} alt="ECR" className="img-fluid" width="120px" /></i>
                            </div>
                            <div className="col-md-10">
                                <h5>Can I relocate a vehicle?</h5>
                                <p>To relocate a vehicle you will need to be over 21 years of age and have a full drivers licence for at least 1 year without any restrictions. That’s it!</p>
                            </div>
                        </div>
                        <div className="col-md-12 text-left my-5">
                            <div class="video_play">
                                <video controls autoplay>
                                    <source src="" type="video/mp4" />
                                    <source src="" type="video/ogg" />
                                    Your browser does not support the video tag.
                        </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

const mapStateToProps = (state) => {
    return {

    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
    }
}
export const HowItWorkComponent = connect(mapStateToProps, mapDispatchToProps)(Screen);