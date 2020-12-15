import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Previous extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previousLocation: ''
        }
    }
    componentDidUpdate(prevProps) {
        this.setState({
            previousLocation: prevProps
        })
    }
    func() {
        this.props.getLocation(this.state.previousLocation)
    }

    render() {
        return this.state.previousLocation
    }
}

export const PreviousLocation = withRouter(Previous);