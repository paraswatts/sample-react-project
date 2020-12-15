import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import { messaging } from "../../../../init-fcm";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../config/default`);
const { ChangeFcmSession } = require(`../../../../redux/${PLATFORM}/actions`);

export class Screen extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // console.log(this.props)
        let { ChangeFcmSession } = this.props
        let safariAgent = navigator.userAgent.indexOf("Safari") > -1;
        let chromeAgent = navigator.userAgent.indexOf("Chrome") > -1;

        if ((chromeAgent) && (safariAgent)) {
            safariAgent = false
        }
        if (!safariAgent) {
            navigator.permissions
                .query({ name: 'notifications' })
                .then((notificationPerm) => {
                    notificationPerm.onchange = async function () {
                        if (notificationPerm && notificationPerm.state === 'granted') {
                            // console.log('changedS',notificationPerm.state)
                            const token = await messaging.getToken();
                            // console.log('token',token)
                            ChangeFcmSession({ deviceToken: token })
                        }
                    }
                })
                .catch((err) => { console.log(err) })
        }

    }
    render() {
        return (<>

            </>)
    }
}
const mapStateToProps = (state) => {
    return ({

    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        ChangeFcmSession: (data) => dispatch(ChangeFcmSession(data))
    }
}
export const CheckNotification = connect(mapStateToProps, mapDispatchToProps)(Screen);