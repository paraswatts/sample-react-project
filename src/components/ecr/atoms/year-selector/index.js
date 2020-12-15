import React from "react";
import YearPicker from "react-year-picker";
import moment from "moment";

export class YearSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
    }

    render() {
        return <YearPicker onChange={this.handleChange}
            maxDate={moment().add(10, 'years')}
            minDate={moment().subtract(10, 'years')}
        />;
    }
}