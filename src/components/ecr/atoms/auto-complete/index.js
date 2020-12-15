import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export class Autocomplete extends Component {
    static propTypes = {
        state: {
            options: PropTypes.instanceOf(Array).isRequired
        }
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            const tempOptions = nextProps.options.filter(
                (optionName) => {
                    const { name } = optionName
                    return name.toLowerCase().indexOf(nextProps.autoCompleteData.userInput.toLowerCase()) > -1
                }
            );

            this.setState({ ...this.state, tempOptions })


        }
    }

    render() {


        const { placeholder, autoCompleteData, onClick,
            onChange,
            onKeyDown, options, onFocus } = this.props
        let optionList;

        const { showOptions, userInput, activeOption } = autoCompleteData

        if (showOptions && userInput) {
            if (options.length) {
                optionList = (
                    <ul className="options drop-down-custom">
                        {options.map((optionName, index) => {
                            let className;
                            const { name } = optionName
                            if (index === activeOption) {
                                className = 'option-active';
                            }
                            return (
                                <li className={className} key={name} onClick={onClick}>
                                    {name}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                optionList = (
                    <ul className="options drop-down-custom">
                        <li className='no-option'>No option</li>
                    </ul>
                );
            }
        }


        return (
            <React.Fragment>
                <div className="search">
                    <input
                        type="text"
                        className="form-control"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        placeholder={placeholder}
                        value={userInput}
                        onFocus={onFocus}
                    />
                </div>
                {optionList}
            </React.Fragment>
        );
    }
}

