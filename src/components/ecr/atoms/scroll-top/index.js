import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../config/default`);
const { savePreviousLocation } = require(`../../../../redux/${PLATFORM}/actions`)
class ScrollComponent extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            document.getElementsByTagName('body')[0].scrollTo(0, 0)
            this.props.savePreviousLocation(prevProps.location.pathname)
        }
    }
    render() {
        return this.props.children || null
    }
}

const mapStateToProps = (state) => {
    return ({
        state
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        savePreviousLocation: (credentials) => dispatch(savePreviousLocation(credentials))
    }
}

export const ScrollToTop = withRouter(connect(mapStateToProps, mapDispatchToProps)(ScrollComponent));
