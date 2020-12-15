import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import "./style.scss";
const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../../config/default`);
const { FAQ_ICON } = require(`../../../../../shared/${PLATFORM}/constants`)
const { startLoader, stopLoader, getFaq } = require(`../../../../../redux/${PLATFORM}/actions`);

export const Screen = ({ getFaq, faq }) => {
    const [trigger, setTrigger] = useState({})
    useEffect(() => {
        getFaq()
    }, [])

    useEffect(() => {
        let triggerObj = {}
        if (faq.length > 0) {
            faq.map((obj, index) => {
                triggerObj = { ...triggerObj, [index]: false }
            })
        }
        setTrigger(triggerObj)

    }, [faq])

    useEffect(() => {
    }, [trigger])

    const handletrigger = (collapse, triggerValue) => {
        let c = document.getElementsByClassName('Collapsible__trigger is-open')
        let IsOpen = trigger[`${triggerValue}`]
        let arr = [...c]
        if (arr.length > 0 && IsOpen === true) {
            arr.map(obj => {
                if (obj.innerHTML === collapse) {
                    setTrigger({ ...trigger, [`${triggerValue}`]: false })
                }
            })
        }

        if (IsOpen === false) {
            Object.keys(trigger).forEach(v => { if (trigger[v] !== trigger[`${triggerValue}`]) { trigger[v] = false } })
            setTrigger({ ...trigger, [`${triggerValue}`]: true })
        }
    }

    return (<div>
        {faq && faq.length > 0 ?
            <div className="main_section vehical_head">
                <div className="container">
                    <div className="faq_main">
                        <div className="row justify-content-center">
                            <div className="col-md-10">

                                <div className="row align-items-top justify-content-center">
                                    <div className="col-md-2 text-center">
                                        <i><img src={FAQ_ICON} alt="ECR" className="img-fluid" /></i>
                                    </div>
                                    <div className="col-md-10 px-4">
                                        <h5 className="mb-3 text-left">Welcome to our Frequently Asked Questions sections</h5>
                                        <p className="mb-5"><em>We hope you will easily find the answer you are looking for. In case you don't please don't hesitate to contact us on <a href="tel:0800 001122">0800 001122</a> or <a href="mailto:info@easycarrelo.co.nz">info@easycarrelo.co.nz</a> </em></p>
                                        {faq.map((faq, index) => {
                                            return <div className="accordion_sec faq_block">
                                                <Collapsible trigger={faq.question} open={trigger[index]}
                                                    handleTriggerClick={() => handletrigger(faq.question, index)}>
                                                    <div key={index}>
                                                        <p>{faq.answer}</p>
                                                    </div>
                                                </Collapsible>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : `No FAQ's found.`}
    </div>)
}

const mapStateToProps = (state) => {
    return {
        faq: state.DriverReducer.getFaq
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        getFaq: () => dispatch(getFaq())
    }
}
export const FaqComponent = connect(mapStateToProps, mapDispatchToProps)(Screen);