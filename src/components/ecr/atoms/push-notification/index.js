import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import { messaging } from "../../../../init-fcm";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../config/default`);
const { saveFCMToken } = require(`../../../../redux/${PLATFORM}/actions`);

class NotificationScreen extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

        let safariAgent = navigator.userAgent.indexOf("Safari") > -1;
        let chromeAgent = navigator.userAgent.indexOf("Chrome") > -1;

        if ((chromeAgent) && (safariAgent)) {
            safariAgent = false
        }
        if (!safariAgent) {
            messaging.onMessage((payload) => console.log('Message received. ', payload));
        }
        navigator.serviceWorker.addEventListener("message", (message) => {
            // console.log('message inside push',message)
            let title = message && message.data && message.data['firebase-messaging-msg-data'] &&
                message.data['firebase-messaging-msg-data'].notification && message.data['firebase-messaging-msg-data'].notification.title ?
                message.data['firebase-messaging-msg-data'].notification.title : ''
            let body = message && message.data && message.data['firebase-messaging-msg-data'] &&
                message.data['firebase-messaging-msg-data'].notification && message.data['firebase-messaging-msg-data'].notification.body ?
                message.data['firebase-messaging-msg-data'].notification.body : ''
            store.addNotification({
                title: title,
                message: body,
                type: "default",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 12000,
                    onScreen: true
                }
            })
        }
        );
    }
    render() {
        return (<>
            <ReactNotification />
        </>)
    }
}

const mapStateToProps = (state) => {
    return ({

    });
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export const NotificationComponent = connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);