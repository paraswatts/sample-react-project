import React, { useMemo, useState } from 'react';
import {
    Elements, CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    injectStripe
} from 'react-stripe-elements';
import './styles.scss';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);

const { ROUTES } = require(`../../../../../../shared/${PLATFORM}/constants`)

const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)

const handleBlur = () => {
    // console.log('[blur]');
};
const handleChange = (event) => {

}
const handleClick = () => {
    // console.log('[click]');
};
const handleFocus = () => {
    // console.log('[focus]');
};
const handleReady = () => {
    // console.log('[ready]');
};


const useOptions = () => {
    const options = useMemo(
        () => ({
            style: {
                base: {
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        []
    );

    return options;
};

class Form extends React.Component {
    state = {
        snackbarData: {
            variant: '',
            message: ""
        },
        openSnackBar: false,
    }
    handleSubmit = (ev) => {
        ev.preventDefault();

        const { saveCard } = this.props
        if (this.props.stripe) {
            this.props.stripe
                .createToken()
                .then((payload) => {
                    saveCard({
                        token: (payload && payload.token && payload.token.id)
                    },
                        (response) => {
                            this.setState({
                                snackbarData: {
                                    variant: response.status ? 'success' : 'error',
                                    message: response.msg || 'error'
                                }
                            })
                            this.setState({ openSnackBar: true })
                            setTimeout(() => {
                                this.props.history.push(ROUTES.DASHBOARD)
                            }, 1000)
                        },
                        (response) => {
                            this.setState({
                                snackbarData: {
                                    variant: response.status ? 'success' : 'error',
                                    message: response.msg || 'error'
                                }
                            })
                            this.setState({ openSnackBar: true })
                        }
                    )
                });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };

    render() {
        const { openSnackBar, snackbarData } = this.state
        return (

            <div className='app-main_outer' onClick={() => {
            }}>
                <SnackbarWrapper
                    visible={openSnackBar}
                    onClose={() => this.setState({ openSnackBar: false })}
                    variant={snackbarData.variant}
                    message={snackbarData.message}
                />
                <div className="container-fluid"
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <form onSubmit={this.handleSubmit} className='stripe-payment'>
                        <h5>Credit Card</h5>
                        <p>Please add a credit card to your account</p>
                        <div className="row">
                            <div class="col-md-8">
                                <div className="row">
                                    <div className="col-md-6 card_pay">
                                        <div class="form-group">
                                            <label>Card number</label>
                                            <CardNumberElement
                                                className='form-control'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                onFocus={handleFocus}
                                                onReady={handleReady}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6 card_pay">
                                        <div class="form-group">
                                            <label>Expiration date </label>
                                            <CardExpiryElement
                                                className='form-control'
                                                onBlur={handleBlur}
                                                onChange={handleChange}

                                                onFocus={handleFocus}
                                                onReady={handleReady}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 card_pay">
                                        <label>CVC</label>
                                        <CardCvcElement
                                            className='form-control'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onReady={handleReady}
                                        />

                                    </div>
                                </div>

                                <button type="submit" className="btn btn-sm btn-primary my-4">Pay</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export const Screen = injectStripe(Form)