import React, { useMemo } from 'react';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    injectStripe
} from 'react-stripe-elements';
import './styles.scss';
import TextField from '@material-ui/core/TextField';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)
const { ROUTES, PAY_ICON, REMOVE_ICON, VISA_ICON,
    MAESTRO_ICON,
    MASTER_CARD_ICON,
    JCB_ICON,
    HYPER_CARD_ICON,
    ELO_ICON,
    DISCOVER_ICON,
    DINERS_ICON,
    AMEX_ICON,
    ALIPAY_ICON,
    PAYPAL_ICON,
    UNION_ICON,
    VERVE_ICON } = require(`../../../../../../shared/ecr/constants`)
const { DecisionPopup } = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`);

const handleBlur = () => {
    // console.log('[blur]');
};
const handleChange = (event) => {
    // if (event.error) {
    //     setError(event.error.message);
    // } else {
    //     setError(null);
    // }
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
                    // fontSize,
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
    constructor(props) {
        super(props);
        const { getCards, cards } = this.props
    }
    componentDidMount() {
        const { getCards, cards } = this.props

        let tempSelectedCard;
        cards.filter((item, index) => {
            if (item.default) {
                tempSelectedCard = item.id
            }
        })
        this.setState({
            selectedCard: tempSelectedCard
        })



    }
    state = {
        selectedCard: 1,
        snackbarData: {
            variant: '',
            message: ""
        },

        openSnackBar: false,
        confirmBox: false,
        deleteItemData: ''
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        const { startLoader, stopLoader } = this.props

        startLoader()
        if (this.props.stripe) {
            this.props.stripe
                .createToken()
                .then((payload) => {
                    if (!!(payload && payload.error)) {
                        this.setState({
                            snackbarData: {
                                variant: 'error',
                                message: (payload && payload.error && payload.error.message)
                            }
                        })
                        this.setState({ openSnackBar: true })
                        stopLoader()

                    }
                    else {
                        let promoData = !!this.state.validPromo ? {promoCode:this.state.validPromo}:{};

                        this.props.purchaseToken({
                            cardId: (payload && payload.token && payload.token.card && payload.token.card.id),
                            packageId: this.props.packageId,
                            stripeToken: (payload && payload.token && payload.token.id),
                            ...promoData
                        }, (response) => {
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
                            stopLoader()
                        },
                            (response) => {
                                this.setState({
                                    snackbarData: {
                                        variant: response.status ? 'success' : 'error',
                                        message: response.msg || 'error'
                                    }
                                })
                                this.setState({ openSnackBar: true })
                                stopLoader()
                            }
                        )
                    }
                }
                ).catch(() => {
                    stopLoader()
                })
                ;
        } else {
            this.setState({
                snackbarData: {
                    variant: 'error',
                    message: 'Something went wrong!'
                }
            })
            this.setState({ openSnackBar: true })
            console.log("Stripe.js hasn't loaded yet.");
            stopLoader()

        }
    };
    componentWillReceiveProps(nextProps) {
        const { getCards, cards } = this.props

        if (nextProps.anyUpdate !== this.props.anyUpdate) {
            getCards()
        }
    };

    cardDetector = (card) => {
        switch (card.toLowerCase()) {
            case 'visa':
                return VISA_ICON
            case 'mastercard':
                return MASTER_CARD_ICON
            case 'maestro':
                return MAESTRO_ICON
            case 'jcb':
                return JCB_ICON
            case 'hypercard':
                return HYPER_CARD_ICON
            case 'elo':
                return ELO_ICON
            case 'discover':
                return DISCOVER_ICON
            case 'diners':
                return DINERS_ICON
            case 'amex':
                return AMEX_ICON
            case 'alipay':
                return ALIPAY_ICON
            case 'paypal':
                return PAYPAL_ICON
            case 'unionpay':
                return UNION_ICON
            case 'verve':
                return VERVE_ICON
            default:
                return PAY_ICON
        }
    };

    getCards = () => {

    }

    render() {
        const { getCards, purchaseToken, cards, deleteCard, setDefaultCard,applyPromo } = this.props
        const { selectedCard, openSnackBar, snackbarData, confirmBox,promoText, validPromo } = this.state

        return (
            <>
                <SnackbarWrapper
                    visible={openSnackBar}
                    onClose={() => this.setState({ openSnackBar: false })}
                    variant={snackbarData.variant}
                    message={snackbarData.message}
                />
                {confirmBox && <DecisionPopup
                    modalVisibility={confirmBox}
                    dialogTitle={'Delete Card'}
                    toggleDialogModal={() => this.setState({ confirmBox: false })
                    }
                    dialogContent={'Are you sure, you want to delete this card?'}
                    confirmButtonTitle={'confirm'}
                    rejectButtonTitle={'cancel'}
                    onConfirmation={() => {
                        const { deleteItemData, } = this.state
                        deleteCard(deleteItemData, (response) => {
                            this.setState({
                                snackbarData: {
                                    variant: response.status ? 'success' : 'error',
                                    message: response.msg || 'error'
                                }
                            })
                            this.setState({ openSnackBar: true })
                            this.setState({ confirmBox: false })

                        }, (response) => {
                            this.setState({
                                snackbarData: {
                                    variant: response.status ? 'success' : 'error',
                                    message: response.msg || 'error'
                                }
                            })
                            this.setState({ openSnackBar: true })

                        }
                        )
                    }}
                    onRejection={() => {
                        this.setState({ confirmBox: false })
                    }}
                />}
                <div className='app-main_outer'>
                    <div className="container-fluid">
                         <div className="form-row">
                                <div className="col-md-5 card_pay">
                                <div className="form-group">
                                    <label className="p-2">Promotion</label>
                                    <TextField
                                        label={'Enter Promocode'}
                                        onChange={event => {
                                            console.log('text', event.target.value);
                                            this.setState({
                                                validPromo:'',
                                                promoText:event.target.value
                                            })
                                        }}
                                    />

                                    <button onClick={() => {
                                        applyPromo(promoText,
                                            (response) => {
                                                console.log('resp succ', response);
                                                this.setState({
                                                    snackbarData: {
                                                        variant: response.status ? 'success' : 'error',
                                                        message: 'Promo code successfully applied.' || 'error'
                                                    },
                                                    validPromo:promoText
                                                })
                                                this.setState({ openSnackBar: true })
                                            },
                                            (response) => {
                                                console.log('resp err', response);
                                                this.setState({
                                                    snackbarData: {
                                                        variant: response.status ? 'success' : 'error',
                                                        message: response.msg || 'error'
                                                    }
                                                })
                                                this.setState({ openSnackBar: true })
                                            })
                                    }} type="submit"
                                        className="btn btn-sm btn-primary my-4" >
                                    Apply Code</button>
                                </div>
                                </div>
                        </div>
                        <form onSubmit={this.handleSubmit} className='stripe-payment'>
                            <div className="form-row">
                                <div className="col-md-5 card_pay">
                                    <div className="form-group">
                                        <label>Card number </label>
                                        <CardNumberElement
                                            className='form-control'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onReady={handleReady}
                                        // options={options}
                                        // {...createOptions(this.props.fontSize)}
                                        />

                                        {/* <div className="card-errors" role="alert">{error}</div> */}

                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-5 card_pay">
                                    <div className="form-group">
                                        <label>Expiration date </label>
                                        <CardExpiryElement
                                            className='form-control'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            // options={options}

                                            // options={useOptions}
                                            onFocus={handleFocus}
                                            onReady={handleReady}
                                        // {...createOptions(this.props.fontSize)}
                                        />
                                        {/* <div className="card-errors" role="alert">{error}</div> */}

                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-5 card_pay">
                                    <div className="form-group">
                                        <label>CVC</label>
                                        <CardCvcElement
                                            className='form-control'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onReady={handleReady}
                                        // options={options}
                                        />

                                        {/* <div className="card-errors" role="alert">{error}</div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-sm btn-primary my-4" >
                                    Pay</button>
                            </div>
                            <div className="col-md-12">
                                <div className="row align-items-center">
                                    <img src={require('../../../../../../assets/icons/powered-stripe-logo.png')} alt="ECR" className="img-fluid mr-3" width="150px" />
                                    {/* <img src={require('../../../../../../assets/icons/master_card.png')} alt="ECR" className="img-fluid mr-2" width="50px" />
                                <img src={PAY_ICON} alt="ECR" className="img-fluid" width="30px" /> */}
                                </div>
                            </div>
                        </form>

                        {!!cards.length && <div className="saved_cards col-md-6 rounded mt-5">
                            <div className="savedcard_details text-capitalize">
                                <h5>Saved card details</h5>
                            </div>
                            <ul>
                                {cards.map((item, index) => {
                                    return (
                                        <li className="radio" key={index + ''}>
                                            <input name="radio" type="radio"
                                                checked={item.id == selectedCard} />
                                            <label htmlFor="radio-1" className="radio-label"
                                                onClick={() => {
                                                    this.setState({ selectedCard: item.id })
                                                }}
                                            >

                                            </label>
                                            <div className="col-md-2 col-sm-2 col-2 card_type pr-0">
                                                <img src={this.cardDetector(item.brand)} alt="ECR" className="img-fluid" width="30px" />
                                            </div>
                                            <div className="col-md-9 col-sm-9 col-9 media-body">
                                                <h6 className='card-detail-text'>Ending with {item.last4} <br />(Expires on {item.exp_month.toString().length > 1 ? item.exp_month : `0${item.exp_month}`},{item.exp_year})</h6>
                                            </div>
                                            {/* <div className="col-md-3 col-sm-3 col-3 add_css">
                                                <form>
                                                    <div className="form-group">
                                                        <input type="number" className="form-control" placeholder="CVV" />
                                                    </div>
                                                </form>
                                            </div> */}
                                            {/* <div className="col-md-3 col-sm-3 col-3 select_card_type">
                                                <span className="mb-0 text-sm">Make Default</span>
                                            </div> */}
                                            <div className="col-md-1 col-sm-1 col-1 remove_card_details p-0"
                                                onClick={() => {
                                                    this.setState({
                                                        deleteItemData: item.id,
                                                        confirmBox: true
                                                    })
                                                }}
                                            >
                                                <img src={REMOVE_ICON} alt="ECR" className="img-fluid" width="20px" />
                                            </div>

                                        </li>
                                    )
                                })}
                                {/* <li className="radio">
                                <input id="radio-2" name="radio" type="radio" />
                                <label for="radio-2" className="radio-label">
                                    <div className="col-md-1 card_type">
                                        <img src={PAY_ICON} alt="ECR" className="img-fluid" width="30px" />
                                    </div>
                                    <div className="col-md-5 media-body">
                                        <h6>Mastercard ending in 4040 <br />(Expires in 07.22)</h6>
                                    </div>
                                    <div className="col-md-2 add_css">
                                        <form>
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="CVV" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-3 select_card_type">
                                        <span className="mb-0 text-sm">Make Default</span>
                                    </div>
                                    <div className="col-md-1 remove_card_details">
                                        <img src={REMOVE_ICON} alt="ECR" className="img-fluid" width="20px" />
                                    </div>
                                </label>
                            </li> */}
                            </ul>
                            <div className="continue_continue text-left">
                                <button type="submit" className="btn btn-lg btn-primary"
                                    onClick={() => {

                                        const { stopLoader, startLoader, setDefaultCard } = this.props
                                        const { selectedCard } = this.state


                                        if (selectedCard) {
                                            startLoader()
                                            setDefaultCard(selectedCard, (response) => {
                                            }, (response) => {
                                                this.setState({
                                                    snackbarData: {
                                                        variant: response.status ? 'success' : 'error',
                                                        message: response.msg || 'error'
                                                    }
                                                })
                                                this.setState({ openSnackBar: true })

                                            });
                                            let promoData = !!this.state.validPromo ? {promoCode:this.state.validPromo}:{};

                        
                                            this.props.purchaseToken({
                                                cardId: (selectedCard),
                                                packageId: this.props.packageId,
                                                ...promoData
                                                // stripeToken: (payload && payload.token && payload.token.id)
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
                                                    stopLoader()
                                                },
                                                (response) => {
                                                    this.setState({
                                                        snackbarData: {
                                                            variant: response.status ? 'success' : 'error',
                                                            message: response.msg || 'error'
                                                        }
                                                    })
                                                    this.setState({ openSnackBar: true })
                                                    stopLoader()
                                                }
                                            )
                                        }
                                        else {
                                            this.setState({
                                                snackbarData: {
                                                    variant: 'error',
                                                    message: 'Please select the card.'
                                                }
                                            })
                                            this.setState({ openSnackBar: true })
                                        }
                                    }}
                                    disabled={!this.state.selectedCard}
                                >
                                    Continue
                        </button>
                            </div>
                        </div>}
                    </div >
                </div>
            </>
        );
    }
}

export const Screen = injectStripe(Form)