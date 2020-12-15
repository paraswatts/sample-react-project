import React from 'react';
import {
    BrowserRouter
} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthRouter from '../auth-router';
import User from '../user-router';
import Agency from '../agency-router';
import WelcomeRouter from '../router';
import { StripeProvider, Elements } from 'react-stripe-elements';
const { defaultConfig: { PLATFORM, STRIPE_ID } } = require(`../../../../config/default`);
const { USER_ROLES } = require(`../../../../shared/${PLATFORM}/constants`)
const { Loader } = require(`../../../../components/${PLATFORM}/atoms/loader`)
const { ScrollToTop } = require(`../../../../components/${PLATFORM}/atoms/scroll-top`)
const { ROUTES } = require(`../../../../shared/${PLATFORM}/constants/routes`);
const stripePromise = STRIPE_ID;

export const MainRouter = (props) => {
    const { userToken, loader, platformType, welcome, prevLocation } = props;

    return (
        <StripeProvider apiKey={stripePromise}>
            <Elements>
                <BrowserRouter>
                    <ScrollToTop>
                        {loader && <Loader />}
                        {welcome === true ?
                            <WelcomeRouter {...props} />
                            :
                            userToken ? (platformType === USER_ROLES.DRIVER ?
                                <User {...props} />
                                : <Agency {...props} />)
                                : <AuthRouter {...props} />
                        }

                    </ScrollToTop>
                </BrowserRouter>
            </Elements>

        </StripeProvider>
    );
}

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken,
        platformType: state.CommonReducer.platformType,
        loader: state.CommonReducer.loader,
        welcome: state.CommonReducer.welcome,
        prevLocation: state.CommonReducer.prevLocation,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export const RootRouter = connect(mapStateToProps, mapDispatchToProps)(MainRouter);