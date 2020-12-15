import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Collapsible from 'react-collapsible';
const { defaultConfig: { PLATFORM } } = require(`../../../../config/default`);
const { FREQUENCY } = require(`../../../../shared/${PLATFORM}/constants/`);

export const AccordionComponent = ({ vehicle = {}, faq }) => {

    const [trigger, setTrigger] = useState({
        importantDetails: false,
        insurance: false,
        location: false,
        vehicleDetails: false,
        policy: false,
        faq: false
    })
    useEffect(() => {
        let str = strip(vehicle && vehicle.termsData && vehicle.termsData.description)
    }, [vehicle && vehicle.termsData && vehicle.termsData.description])

    const strip = (html) => {
        html = (html).replace(/&nbsp;/gi, " ")
        var doc = new DOMParser().parseFromString(html, 'text/html');
        let terms = document.getElementById('terms');
        terms.innerHTML = doc.body.textContent
    }
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
    return (
        <div className="accordion_sec">
            <Collapsible trigger="Important Details" open={trigger.importantDetails} handleTriggerClick={() => handletrigger("Important Details", "importantDetails")}>
                <div className="row">

                    <div className="col-md-6">
                        {vehicle && vehicle.extraItemsData && vehicle.extraItemsData.items.length > 0 ?
                            <>
                                <h6><strong>Extra Items</strong></h6>
                                <ul className='list-group'>
                                    {vehicle.extraItemsData.items.map((item, index) => {
                                        return (<li className='list-group-item' key={index}> {`${item.name} at $${item.price} ${FREQUENCY[item.frequency - 1].label}`}</li>)
                                    })}
                                </ul>
                            </> : vehicle && vehicle.fuelOfferData || vehicle.ferryCostData ?
                                <>
                                    <h6><strong>Extra Items</strong></h6>
                                    <li className='list-group-item' >Not Available</li></> : 'Not Available'}
                    </div>
                    <div className="col-md-6">
                        {vehicle && vehicle.fuelOfferData && vehicle.fuelOfferData.value ?
                            <>
                                <h6><strong> Fuel Offer</strong></h6>
                                <ul className='list-group'>
                                    <li className='list-group-item'>{`Free ${vehicle && vehicle.fuelOfferData && vehicle.fuelOfferData.value} of Fuel.`}</li>
                                </ul>
                            </> : ''}


                        {vehicle && vehicle.ferryCostData && vehicle.ferryCostData.name ?
                            <>
                                <h6><strong>Ferry Cost</strong></h6>
                                <ul className='list-group'>
                                    <li className='list-group-item'>{`${vehicle && vehicle.ferryCostData && vehicle.ferryCostData.name}`}</li>
                                </ul>
                            </> : ''}
                    </div>
                </div>
            </Collapsible>
            <Collapsible trigger="Insurance" open={trigger.insurance} handleTriggerClick={() => handletrigger("Insurance", "insurance")}>
                {vehicle && vehicle.insuranceData ?
                    <>

                        <div className="row veh_detail">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col text-left">
                                        Insurance Name
                                    </div>
                                    <div className="col text-right">
                                        {vehicle && vehicle.insuranceData && vehicle.insuranceData.name}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col text-left">
                                        Excess
                                   </div>
                                    <div className="col text-right">
                                        {`$${vehicle && vehicle.insuranceData && vehicle.insuranceData.excess}`}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col text-left">
                                        Bond:
                                        </div>
                                    <div className="col text-right">
                                        {`$${vehicle && vehicle.insuranceData && vehicle.insuranceData.bond}`}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col text-left">
                                        Daily Fee:
                                        </div>
                                    <div className="col text-right">
                                        {`$${vehicle && vehicle.insuranceData && vehicle.insuranceData.dailyFee}`}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </>

                    : 'Insurance Not included in this relocation.'
                }
            </Collapsible >
            <Collapsible trigger="Location" open={trigger.location} handleTriggerClick={() => handletrigger("Location", "location")}>
                <div className="location_detail">
                    <div className="location_vac text-uppercase row">
                        <h5>Pickup & Dropoff Branch Details</h5>
                    </div>
                    <div className="row veh_detail">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col text-left">
                                    Branch Name
                               </div>
                                <div className="col text-right">
                                    {vehicle && vehicle.pickupBranchData && vehicle.pickupBranchData.name}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-left">
                                    City
                               </div>
                                <div className="col text-right">
                                    {vehicle && vehicle.pickupBranchData && vehicle.pickupBranchData.city}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-left">
                                    Opens At
                               </div>
                                <div className="col text-right">
                                    {moment(vehicle && vehicle.pickupBranchData && vehicle.pickupBranchData.openFrom).format('LT')}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-left">
                                    Closes At
                               </div>
                                <div className="col text-right">
                                    {moment(vehicle && vehicle.pickupBranchData && vehicle.pickupBranchData.closeBy).format('LT')}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col text-left">
                                    Branch Name
                                </div>
                                <div className="col text-right">
                                    {vehicle && vehicle.dropoffBranchData && vehicle.dropoffBranchData.name}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-left">
                                    City
                               </div>
                                <div className="col text-right">
                                    {vehicle && vehicle.dropoffBranchData && vehicle.dropoffBranchData.city}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-left">
                                    Opens At
                               </div>
                                <div className="col text-right">
                                    {moment(vehicle && vehicle.dropoffBranchData && vehicle.dropoffBranchData.openFrom).format('LT')}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-left">
                                    Closes At
                               </div>
                                <div className="col text-right">
                                    {moment(vehicle && vehicle.dropoffBranchData && vehicle.dropoffBranchData.closeBy).format('LT')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Collapsible>

            <Collapsible trigger="Vehicle details" open={trigger.vehicleDetails} handleTriggerClick={() => handletrigger("Vehicle details", "vehicleDetails")}>
                <div className="row veh_detail">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col text-left">Fuel Type</div>
                            <div className="col text-right">{vehicle && vehicle.fuelTypeData && vehicle.fuelTypeData.fuelType}</div>
                        </div>
                        <div className="row">
                            <div className="col text-left">Transmission </div>
                            <div className="col text-right">{vehicle && vehicle.transmissionData && vehicle.transmissionData.name}</div>
                        </div>
                        <div className="row"><div className="col text-left">Adult Seats</div>
                            <div className="col text-right">
                                {vehicle && vehicle.vehicleData && vehicle.vehicleData.adultSeats}</div>
                        </div>
                        <div className="row">
                            <div className="col text-left">Child Seats</div>
                            <div className="col text-right">{vehicle && vehicle.vehicleData && vehicle.vehicleData.childSeats}</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col text-left">Small Luggage Space</div>
                            <div className="col text-right">{vehicle && vehicle.vehicleData && vehicle.vehicleData.smallLuggageSpace}</div>
                        </div>
                        <div className="row">
                            <div className="col text-left">Large Luggage Space</div>
                            <div className="col text-right">{vehicle && vehicle.vehicleData && vehicle.vehicleData.largeLuggageSpace}</div>
                        </div>
                        <div className="row">
                            <div className="col text-left">Vehicle Code </div>
                            <div className="col text-right">{vehicle && vehicle.vehicleData && vehicle.vehicleData.vehicleCode ? vehicle && vehicle.vehicleData && vehicle.vehicleData.vehicleCode : 'Nil'}</div>
                        </div>
                    </div>
                </div>
            </Collapsible>

            <Collapsible trigger="Policy" open={trigger.policy} handleTriggerClick={() => handletrigger("Policy", "policy")}>
                <div id="terms"></div>
            </Collapsible>

            <Collapsible trigger="FAQ's" open={trigger.faq} handleTriggerClick={() => handletrigger("FAQ's", "faq")}>

                {faq && faq.length > 0 ?
                    <>
                        <h4 className="mb-3">Frequently Asked Questions</h4>
                        <hr />
                        {faq.map((faq, index) => {
                            return <div className="faq_list" key={index}><h6>{faq.question}</h6>
                                <p>{faq.answer}</p>
                            </div>
                        })}
                    </>
                    : ''}
            </Collapsible>
        </div >
    )

}