import React from 'react';
import {
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../config/default`);
const { WelcomeScreen } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/welcome/screen`)
const { ROUTES } = require(`../../../../shared/${PLATFORM}/constants/routes`);

const WelcomeRouter = (props) => {
    return (
        <React.Fragment>
            <Switch>
                <Route path={ROUTES.WELCOME} component={WelcomeScreen} {...props} />
                <Redirect to={ROUTES.WELCOME} />
            </Switch>
        </React.Fragment>
    );
}
export default WelcomeRouter;