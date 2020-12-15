import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import { connect } from "react-redux";
const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../../config/default`);
const { CONSTRUCTION_ICON } = require(`../../../../../shared/ecr/constants`)
const { WelcomeReduxForm } = require('./form')
const { stopLoader, startLoader, welcome } = require(`../../../../../redux/${PLATFORM}/actions`);
const Screen = ({ welcomeShow, startLoader, stopLoader }) => {
    return (
        <>
            <div className="bg_coming">
            </div>

            <div className="comming-soon row justify-content-center align-items-center h-100">
                <div className="col-md-6 text-center">
                    <i className="mb-4 d-block"><img src={CONSTRUCTION_ICON} alt="ECR" width="120" /></i>
                    <h2>Website coming soon</h2>
                    <WelcomeReduxForm welcomeShow={welcomeShow} startLoader={startLoader} stopLoader={stopLoader} />
                </div>
            </div>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        welcome: state.CommonReducer.welcome,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        welcomeShow: (data, success, error) => dispatch(welcome(data, success, error))
    }
}

export const WelcomeScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Screen);