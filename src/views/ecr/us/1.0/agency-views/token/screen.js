import React, { useState, useEffect } from 'react';
import './styles.scss';
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    ROUTES,
    DISCOUNT_TYPE, DOWN_ICON
} = require(`../../../../../../shared/${PLATFORM}/constants`);
export const Screen = ({
    history,
    getPackages,
    packages = [],
    buyingTokenId,
    getToken = () => { },
    totalToken,
    agencyData,
    getCards,
    detailsNotFIlled
}) => {

    useEffect(() => {
        getPackages()
        getToken()
        getCards()
    }, [packages && packages.length])

    const [modalVisible, setModalVisible] = useState(false)
    const [editData, setEditdata] = useState({
        id: '',
        starRating: '',
        commentTodriver: "",
        commentForEcr: '',
        clickedOn: ""
    })
    const [commentModal, setCommentModal] = useState(false)
    const commentModalVisibility = (data) => {
        setEditdata(data)
        setModalVisible(true)
    }




    return (
        <div className={'app-main_outer'}>

            <div className="container-fluid">
                <div className="panel-body">
                    <div className="buy_token">
                        <h4 className="my-2">Buy Tokens</h4>
                        <span>{totalToken ? `You currently have ${totalToken} tokens` : `You have no token`}</span>

                        <div className="row justify-content-center">
                            {/* <div className="col-md-4 text-center">
                                <div className="token_block">
                                    <h5>
                                        Tokens:
		                        	    <span>1</span>
                                    </h5>

                                    <div className="price_save d-flex flex-column">
                                        <label>$40</label>
                                    </div>

                                    <div className="text-center buy_btn"
                                        onClick={() => {
                                            history.push(ROUTES.PAYMENT)
                                        }}
                                    >
                                        <button className="btn btn-lg btn-primary text-capitalize">Buy Now</button>
                                    </div>
                                </div>

                            </div> */}
                            {
                                !!(packages.length) && packages.map((item, index) => {

                                    return (

                                        <div className="col-md-4 text-center" key={index + ''}>
                                            {!!item.isPopular && item.isPopular && <div className="text-center buy_title mt-3">
                                                <h5>Most Popular
                                                 <i><img src={DOWN_ICON} alt="Down Arrow" /></i>
                                                </h5>
                                            </div>}
                                            <div className={`token_block`}>
                                                <h5>
                                                    Tokens
                                                <span>{item.tokens}</span>
                                                </h5>
                                                <div className="price_save d-flex align-items-center flex-column">
                                                    <label>${item.amount}</label>
                                                    {item && item.discountValue && <span className="off">{(DISCOUNT_TYPE.PERCENTAGE === (item && item.discountType)) ? `Save ${item.discountValue}%` : `Save $${item.discountValue}`}</span>}
                                                </div>
                                                <div className="text-center buy_btn"
                                                    onClick={() => {


                                                        const { userAgency, email } = agencyData
                                                        const { address, city, name, country } = userAgency

                                                        buyingTokenId(item._id)
                                                        if (!country || !email || !address || !city || !name) {
                                                            detailsNotFIlled(true)
                                                            history.push(`${ROUTES.COMPANY_DETAILS}`)
                                                        }
                                                        else {
                                                            setTimeout(() => {
                                                                history.push(`${ROUTES.PAYMENT}?id=${item._id}`)
                                                            }, 0)
                                                        }
                                                    }}
                                                >
                                                    <button className="btn btn-lg btn-primary text-capitalize">Buy Now</button>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                            {
                                !packages.length &&
                                <div className="col-md-4 text-center">
                                    <div className="token_block">
                                        <h5>
                                            Tokens
                                    {/* <span>{item.tokens}</span> */}
                                        </h5>

                                        <div className="price_save d-flex align-items-center flex-column">
                                            <label>Sorry No</label>
                                            <span className="off">Package Found</span>
                                        </div>

                                        <div className="text-center buy_btn"
                                        // onClick={() => {
                                        //     buyingTokenId(item._id)
                                        //     history.push(`${ROUTES.PAYMENT}?id=${item._id}`)
                                        // }}
                                        >
                                            {/* <button className="btn btn-lg btn-primary text-capitalize">Buy Now</button> */}
                                        </div>
                                    </div>

                                </div>
                            }
                            {/* 
                            <div className="col-md-4 text-center">
                                <div className="token_block">
                                    <h5>
                                        Tokens:
		                        	    <span>10</span>
                                    </h5>

                                    <div className="price_save d-flex align-items-center flex-column">
                                        <label>$320</label>
                                        <span className="off">Save 10%</span>
                                    </div>

                                    <div className="text-center buy_btn"
                                        onClick={() => {
                                            history.push(ROUTES.PAYMENT)
                                        }}
                                    >
                                        <button className="btn btn-lg btn-primary text-capitalize">Buy Now</button>
                                    </div>
                                </div>

                            </div> */}

                        </div>

                        <span className="short_txt"><em>Please note tokens are valid for 12 months and will expire after that.</em></span>
                    </div>
                </div>
            </div>
        </div>
    )
}