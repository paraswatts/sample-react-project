import React, { useEffect, useState } from 'react';
import "./style.scss";

export const TermsComponent = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 privacy_terms">
                    <h4>Terms & Conditions</h4>
                    <hr />
                    <p>easycarrelo.co.nz is a  company registered in NewZealand  (Number: 05179829). These terms & conditions, together with our privacy notice and cookie statement, constitute our agreement with you, for the services we provide in arranging for the supply of car hire. For the avoidance of doubt, ‘you’ refers to the main driver, the person paying for the rental and/or the person making the booking. Please note, although ‘you’ may refer to more than one person, we contract with all parties, but we will only be able to speak to the main driver in respect of a confirmed booking. Together, these are referred to as ‘our terms’. These terms shall apply to all contracts for the provision of our services to the exclusion of all other terms & conditions. No conduct by easycarrelo.c.nz shall be deemed to constitute acceptance of any other terms. Acceptance of the services or signature on any agreement shall be deemed conclusive evidence of your acceptance of these terms. We may change the terms from time to time and you are advised to check the website to consider any changes to the terms which apply to you. Your hire of any car is subject to the terms & conditions of car hire imposed by the car hire company and to the corresponding laws of the country and/or state in which the rental takes place. Individual restrictions may also apply to your car hire.</p>

                    <p>You will be provided with a car by us either directly or as agent. The capacity in which we act depends on our relationship with the car hire company.</p>

                    <p>These terms apply to any booking that you make with us on or through this website, so you should make sure that you are aware of their contents. Both our terms and those of the car hire companies we work with contain some exclusions and limitations of liability.</p>

                    <p>Your booking on this website is conditional on you accepting our terms. If you do not agree with any part of them, you must not proceed with your booking. By confirming that you wish to book a car through this website you,, indicate that you have read and understood and accept our terms. If there is any part that you do not fully understand, or if you have a query about the car hire or any other product, please Contact us.</p>

                    <h6>Confirming your booking and taking payment</h6>
                    <p>In most cases, we will confirm your booking immediately using the email address provided when the booking is made. Sometimes, we need to wait for the car hire company to confirm that a car is available. We will tell you straight away if this happens, and temporarily block the money on your payment card. As soon as they confirm your car, we will let you know, and take the money from your card.</p>

                    <p>Until your car is confirmed, you can ‘void’ the payment at any time. Just hit ‘Manage booking’ at the top of our site, enter the email address provided when making the booking and reservation number, then hit ‘Cancel Booking’. We will unblock the money on your card.</p>

                    <p>Very rarely, a car hire company can’t confirm that a car is available. If this happens, we will tell you, and unblock the money on your card.</p>

                    <p>When you book a car or other product on our site, we will email you to confirm its availability within 48 hours of booking (or, if earlier, at least 24 hours before your pick-up time). We will then send you a booking confirmation.</p>

                    <p>You will not have a contract until we have confirmed your booking and taken the payment. We will send all correspondence to the address provided when making the booking. For the avoidance of doubt, nothing in these terms shall entitle any third party to any benefit or rights pursuant to the Contracts (Rights of Third Parties) Act 1999.</p>

                    <h6>Accuracy of Information</h6>
                    <p>Although we strive to ensure the accuracy of the information on this website, neither we nor our affiliates, suppliers or agents can be held responsible by you for the accuracy of such information. It is solely your responsibility to evaluate the accuracy, completeness and usefulness of all information provided on this website.</p>

                    <p>The easycarrelo.c.nz voucher / eVoucher must be presented to the car hire company when picking up your hire car. We cannot be held responsible for rentals rejected if a voucher / eVoucher is not presented.</p>

                    <p>We cannot accept liability for any charges incurred as a result of documentation signed for and accepted at the car hire counter.</p>

                    <p>We will not be held responsible for anyone driving under the influence of alcohol/drugs, causing wilful damage, driving off-road or driving without due care and attention. You, will accept full responsibility in respect of such claims. This list is not exhaustive.</p>

                    <h6>What is included / excluded in the price?</h6>
                    <p>Please read the specific terms & conditions relating to your car hire, which you will see during the booking process.</p>

                    <h6>Fuel & Deposits at the Car Hire Counter</h6>
                    <p>Most car hire companies require a deposit at the start of the rental to cover the liability excess, any charges incurred during the rental and, in some cases, fuel. In order to make the deposit you will usually be required to have a valid credit card with available funds on it. The card must be in the main driver’s name. Please note, not all car hire companies accept the same card types and you should check the “Important Information” section when making a booking and/or your car hire agreement to confirm which card types will be accepted. If you still have any questions please contact us. Provided the car and extras are returned in the same state as rented and in accordance with the fuel policy, this deposit will be refunded after dropping the car off (please note that it may take up to 30 days for the money to appear on your credit card again).</p>

                    <p>Some car hire companies will require you to return the car with the same amount of fuel it had in the tank at pick-up. Others operate a fuel policy where you, must purchase the first tank of fuel and may drop the car off empty – in which case, there may be no refund for unused fuel.</p>

                    <p>Where the car hire company charges for fuel, the cost may be higher than it would be at a local petrol station.</p>

                    <h6>Out-of-Hours Service</h6>
                    <p>At most airport locations, flights will be met and cars supplied outside normal working hours. However, there may be an additional charge for this service, which will be payable directly to the car hire company. We will advise you whether a charge will apply when you confirm your pick-up times in your booking request. In the event that a flight delay causes the car pick-up to fall outside a car hire company’s normal working hours, the car hire company may agree to provide an out-of-hours service – in which case they will advise you of any fee. We can accept no further responsibility where there is no out-of-hours service available – and it is therefore recommended that you take independent travel insurance. Non-airport car hire counters may also provide an out-of-hours service.</p>

                    <h6>Minimum / Maximum Age Limitations</h6>
                    <p>In most locations, the minimum hiring age is 21 years. Additional fees can apply with certain car hire companies and in certain countries for drivers aged under 25 years or over 65 years: where the correct driver age has been submitted with the booking request, we will advise of any likely fees. Minimum age requirements on larger cars may also be higher at some locations. Please check with our Contact Centre if you  have any questions or concerns about this matter.</p>

                    <h6>Additional Drivers</h6>
                    <p>Fees may apply for additional drivers, payable at the car hire counter (unless otherwise specified on the easycarrelo.c.nz voucher / eVoucher). Please check with our Contact Centre.</p>

                    <h6>Daily Rate Calculations / Periods of Hire / Period of Hire Extensions/ Late Drop-off</h6>
                    <p>The price of your car hire will be confirmed at time of booking and calculated on the basis of 24-hour units. If you wish to extend the period of hire after picking the car up, or if you drop the car off later than stated on your voucher / eVoucher, the contract for such an extension will always be with the car hire company directly and the extra time will be charged for by the car hire company at the local daily rate, which may be higher than the rates agreed with us at the time of booking. The car hire company may also charge an additional penalty for late drop-off, details of any additional payments will be in your contract with the car hire company.</p>

                    <h6>Late Pick-ups / Early Drop-offs</h6>
                    <p>Your rental starts and finishes according to the pick-up and drop-off dates and times detailed on your voucher / eVoucher. Unfortunately, we are unable to provide refunds for unused time if a car is picked up late or dropped off early. If you are unable to pick the car up at the agreed time and date, it is essential you contact us as soon as possible. If you do not, there is no guarantee that the car will still be available – and you will not be entitled to any refund.</p>

                    <h6>One-Way Rentals</h6>
                    <p>One-way rentals must be confirmed in advance and may be subject to one-way fees, payable to the car hire company. We will advise you of the approximate costs after we receive your booking request and receive confirmation from the car hire company regarding the one-way rental.</p>

                    <h6>Child Seats & Special Requests</h6>
                    <p>Child seats, roof racks (not available on some cars) and other ‘extra’ items are available on request in most locations, although they cannot be guaranteed. There is usually a fee payable to the car hire company. In most locations, child seats are required by law. Please note: rear seatbelts may not be provided in all cars. Please check with our Contact Centre regarding these items. Requests for these items should be made at the time of booking.</p>

                    <h6>Deliveries & Collections</h6>
                    <p>Some car hire companies will agree to deliver your car to / collect it from a specified address. If so, there may be a fee for this service, payable to the car hire company. We will advise you whether a fee will apply when you confirm your pick-up / drop-off times, along with the full address details, in your booking request. Please note: car hire companies generally do not deliver to or collect from private accommodation.</p>

                    <h6>Driving Areas</h6>
                    <p>Restrictions may be applicable when taking the hire car to a different country/state/island; our Contact Centre must therefore be advised at the time of booking whether you intend to do this. Additional documentation may be required and local charges may apply for travel to certain countries. Restrictions may also apply in remote areas such as the Australian outback; please check with our Contact Centre.</p>

                    <h6>Cancellations, No Shows & Amendments</h6>
                    <p>In most circumstances the cancellation policy below will apply to your booking; however you should check the car hire company’s terms and conditions in case a more restrictive policy applies.</p>

                    <h6>Cancellation of Fully Prepaid Bookings</h6>
                    <ul>
                        <li>If you cancel 48 hours or more before your rental is due to start, the money you’ve paid will be refunded.</li>
                        <li>If you cancel within the 48 hour period before pick-up, the money you’ve paid will be refunded, minus the cost of 3 days rental:</li>
                        <li>if you had booked the car for less than 3 days, there won’t be any additional charge, but you won’t receive any refund.</li>
                        <li>If you fail to turn up at the agreed time and date, and/or to provide all the necessary documentation, and/or to provide a credit card in the name of the main driver with enough available funds on it for the car’s deposit, the car hire company may refuse you the car. If that happens:</li>
                        <li>if you call us from the counter, the money you’ve paid will be refunded, minus the cost of a 3 days rental</li>
                        <li>if you do not call us from the counter, you’ll receive no refund.</li>
                    </ul>

                    <h6>Cancellation of Deposit Bookings</h6>
                    <ul>
                        <li>If you cancel 48 hours or more before your rental is due to start, the money you’ve paid will be refunded, minus the deposit.</li>
                        <li>If you cancel less than 48 hours in advance, but before your rental is due to start, the money you’ve paid will be refunded, minus either the deposit or the cost of 3 days rental, whichever is greater.</li>
                        <li>If you had booked the car for less than 3 days, there won't be any additional charge, but you won't receive any refund.	No-Show</li>
                        <li>A ‘No-show’ is when you:</li>
                        <li>wish to cancel but don’t tell us before your rental is due to start, or</li>
                        <li>fail to pick the car up at the arranged time and date, or</li>
                        <li>fail to provide the documentation that’s required to pick the car up, or</li>
                        <li>fail to provide a credit card in the main driver’s name with enough available funds on it for the car’s deposit.</li>
                        <li>In all instances of a ‘No-show’, you’ll receive no refund of the money you’ve paid.</li>
                    </ul>

                    <p>The car hire company reserves the right to refuse the car to any customer who fails to arrive on time with all necessary documentation and a credit card in the main driver’s name with enough available funds for the car’s deposit. In such a case, unless the rental has been cancelled in advance, the customer will not be entitled to a refund.</p>

                    <h6>Amendments (changes to your booking)</h6>
                    <ul>
                        <li>You can make changes to your booking any time before you’re due to pick the car up.</li>
                        <li>If your pick-up time is at least 48 hours away, the easiest way to do this is to go to ‘Manage booking’ in the top right-hand corner.</li>
                        <li>If you need to change something when your pick-up time is less than 48 hours away, please call us instead.</li>
                    </ul>

                    <p>There is no administration fee for changing your booking, but any changes you make may affect the rental price. Sometimes (not often), the only way we can change a booking is to cancel it and make another one, in which case we may charge you a cancellation fee on the car hire company’s behalf.</p>

                    <h6>If We Make Changes to Your Booking</h6>
                    <p>Occasionally it may be necessary for changes to be made to your booking (after acceptance) by us or by the car hire company. In all such cases we will advise you  as soon as reasonably possible before pick-up and, if the proposed changes are unacceptable, you will be offered a full refund. However, in such circumstances, we shall have no additional liability in respect of any direct or indirect losses you may suffer as a result of such changes.</p>

                    <h6>Documentation</h6>
                    <p>Your voucher / eVoucher will normally be available once full payment has been received and the car confirmed by the car hire company. Please note that certain ‘request’ cars may take longer to confirm and we will advise you if this is the case. Where the car cannot be picked up due to insufficient documentation or failure to provide a valid credit card, this will be treated as a ‘No Show’, which means you will not be entitled to a refund of money paid. Please ensure that you travel with your voucher / eVoucher, your full valid national driving licence and other identification – please check the ‘What You'll Need To Take’ section of your voucher / eVoucher once the car is confirmed to see if any other documentation is required.</p>

                    <h6>Driving Licence</h6>
                    <p>Every driver must have a full, valid driving licence they have held for at least 1 year (2 years at certain locations; this will be confirmed during the booking process). Expired or provisional licences will not be accepted.</p>
                    <p>When booking the car, our Contact Centre must be advised of any endorsements / points on a driving licence; we reserve the right to refuse the booking on this basis, according to the terms & conditions of the car hire companies we work with.</p>
                    <p>As of June 8th 2015, any driver with a driving licence issued by the DVLA (Driver and Vehicle Licensing Authority) in England, Scotland or Wales must visit View Driving Licence no more than 21 days before the start of their rental: for more about this, please click here. Any driver with a new-style photocard driving licence must also produce the accompanying paper counterpart at the car hire counter.</p>
                    <p>When picking up the car, every driver must present their licence. They must also keep their driving licence with them at all times throughout the rental, for perusal by local authorities.</p>
                    <p>No refunds will be given if a car hire company refuses to supply a car because of undisclosed endorsements – or because you cannot provide a driving licence, its counterpart, or the required information about endorsements.</p>
                    <p>Please note that when driving abroad you may require an International Driving Permit. It is the driver’s responsibility to check whether they will need an International Driving Permit. An International Driving Permit does not replace the requirement for a regular driving licence: a full driving licence in the main driver’s name will still be required in order to rent the car, and every driver requiring an International Driving Permit must keep both documents with them at all times. If an International Driving Permit is required, you will not be able to collect your rental without the permit and your driving licence.</p>
                    <p>All drivers must read the terms and conditions of the car hire company providing their car prior to pick-up, as certain companies and locations may have additional requirements.</p>

                    <h6>Important Information Regarding Exchange Rates</h6>
                    <p>Due to the fluctuation of exchange rates, please be aware that the amount charged to your credit card may differ from the price we quote when you agree to pay for a product or service. The difference (if any) will depend on changes to exchange rates during the period between the moment you book and the moment the charge is reflected in your credit card statement. Similarly, should we refund any money to your account, we will refund the exact amount initially charged – and will not be responsible for any fluctuations in exchange rates that lead to you receiving a larger or smaller refund than expected.</p>

                    <h6>Car Capacity & Car Class</h6>
                    <p>All cars are insured for a maximum number of passengers. We cannot accept liability for the car being unsuitable for all passengers and luggage. As a guide, please refer to the easycarrelo.c.nz website for approximate capacities of the various car classes. We cannot accept responsibility if the car hire company refuses to supply a car because the party size is too big.</p>

                    <p>We are unable to guarantee a particular make or model of car. The car shown on your voucher / eVoucher is for guidance only and the car hire company may instead provide a different car which is deemed to be similar or superior.</p>

                    <h6>Provision of Cars</h6>
                    <p>Car hire companies reserve the right to refuse a car to any person who is considered unfit to drive or does not meet eligibility requirements. We will not be liable for the completion of travel arrangements, nor for any refund, compensation or any other costs you may have to pay in such a case.</p>

                    <h6>Complaints</h6>
                    <p>If you are dissatisfied with your rental, please report this to us as soon as feasible, but at least within 3 months of dropping the car off, by contacting our Customer Service Team. It is difficult for us to assess any claim regarding your rental if this action is not taken at the time of drop off.  Although when you rent a car, you enter a contractual relationship with the car hire company, whenever there’s a problem, we will try to help by contacting the car hire company on your behalf.</p>

                    <p>If the way in which we have handled your complaint is not to your full satisfaction, you may wish to raise a formal complaint with an independent Alternative Dispute Resolution (ADR) provider. If you wish to use ADR you may use the European Commission’s online platform to upload your complaint, which can be found at http://ec.europa.eu/consumers/odr/. This procedure will help you find an appropriate ADR provider. Please note that as we aim to resolve disputes internally, we are not obliged to submit to an ADR procedure operated by any independent ADR provider.</p>

                    <h6>Mechanical Difficulties / Accidents</h6>
                    <p>In the case of breakdown or mechanical difficulties, you must call the car hire company immediately. The car hire company must give authority for repairs or replacement cars. If you are involved in an accident, the local police and the car hire company must be contacted. Keep copies of all relevant documentation you are asked to complete. This may be needed if you wish to make a claim.</p>

                    <p>Your hire of any car is subject to the terms & conditions of car hire imposed by the car hire company and to the corresponding laws of the country and/or state in which the rental takes place. You  will therefore be subject both to our terms and to those of the car hire company. We accept no responsibility for and shall not be liable in respect of any loss, damage, alterations, delays or changes arising from civil strife, industrial disputes including air traffic control disputes, terrorist activity, natural or nuclear disaster, fire or adverse weather conditions, unavoidable technical problems with transport, closure or congestion of airports or ferry ports, cancellation of scheduled flights or financial failure of airlines.</p>

                    <h6>Terms of Your Contract with easycarrelo.c.nz</h6>
                    <p>However you choose to book, it is important to understand how and when a contract is formed. The technical steps required for a contract to be formed are as follows. When we quote prices over the telephone or place our services on our website, we are inviting you to make an offer for their purchase. You do not make this offer until you do so verbally or by clicking ‘Book Now’ on our ‘Payment Details’ page.</p>

                    <p>You will have made us an offer to purchase the services once you have either done so verbally or clicked ‘Book Now’. We will have accepted this offer once we have both received the necessary payment and made your voucher / eVoucher available to you. Where the arrangement with the car hire company is for us to act as an agent, acceptance of your offer is by us as agent on behalf of the car hire company.</p>

                    <p>We are responsible for losses you directly suffer as a result of us breaking this agreement if the losses are a foreseeable consequence of us breaking the agreement. Losses are foreseeable where they could be contemplated by both you and us at the time our agreement is formed. We are not responsible for indirect losses which happen as a side effect of the main loss or damage and which are not foreseeable by you and us; nor are we liable for, without limitations, loss of profits, loss of opportunity, loss of goodwill or consequential losses, damages or costs.</p>

                    <p>We shall not be liable ourselves or vicariously through the car hire companies for either any failure to perform or any delay in performing any of our obligations under or pursuant to this booking, voucher / eVoucher, rental or terms & conditions, if and in so far as performance is delayed, hindered or prevented by force majeure, which expression shall mean any event beyond the reasonable control of the party in question. In the event that the force majeure persists for more than 14 consecutive days, we may terminate and withdraw this booking by giving 14 days’ notice to your original billing address and refunding all amounts paid prior to the force majeure event.</p>

                    <p>We have the right to cancel a booking upon limited or immediate notice in certain circumstances, such as the insolvency of a car hire company. In all circumstances we will use our reasonable endeavours to arrange for the supply of an alternative car, but at periods of high demand it may not be possible. Where a customer has made a fully pre-paid booking and we notify the customer up to 48 hours before pick-up, the customer will receive a return of all monies already paid. In the unlikely circumstance we provide a fully pre-paid customer with notice of cancellation within 48 hours of pick-up, we will provide a full refund of all monies paid and cover other foreseeable losses incurred by the customer as a consequence of us breaking the agreement. Where a customer has made a deposit booking and we notify the customer up to 7 days before pick-up, the customer will receive a return of all monies already paid. Where we provide a deposit customer with notice of cancellation within 7 days of pick-up, we will provide a full refund of all monies paid and cover other foreseeable losses incurred by the customer as a consequence of us breaking the agreement.</p>

                    <h6>Making Bookings and Purchasing or Requesting Products or Services</h6>
                    <p>If you wish to make bookings or to purchase or request products or services described on this website, we (or our business partners) may ask you to supply certain data applicable to your booking or purchase – including, without limitation, credit card information and other personally identifiable data about you. You understand that any such data will be treated by us in the manner described in our privacy notice. You agree that all data that you provide for this purpose will be accurate, current and complete. You agree to pay all charges incurred by you or any users of your account, credit card or other payment mechanism at the rate(s) or price(s) in effect when such charges are incurred. You will also be responsible for paying any applicable taxes relating to your purchases.</p>

                    <p>Verification of submitted data may be required prior to our acceptance of any booking, purchase or order. Except as otherwise required by law or as otherwise expressly stated by us, price, rate and availability of products or services are subject to change without notice. You acknowledge that bookings, purchases and services are subject to additional terms & conditions imposed by us or by the car hire company which supplies your car.</p>

                    <h6>Website Conditions of Use</h6>
                    <p>It is prohibited for anyone to use any device or software program to directly or indirectly interface, or attempt to interface, with this website to retrieve content and/or any other data, including prices. It is also prohibited to interfere, or attempt to interfere, with the normal working of this website; any activity that we consider places undue load or stress on our systems will be terminated. We constantly monitor everyone accessing our website, and the activities of any automated systems or persons conducting an unreasonable amount of searches, with the aim of accessing information and/or prices, will be terminated and those systems/persons blocked from our websites. Your use of the website indicates your agreement to be bound by these Conditions of Use.</p>

                    <h6>Data Protection</h6>
                    <p>Your privacy is important to us. By using this site you accept the terms of our privacy notice.</p>

                    <h6>Use of Cookies and Other Tracking Technologies</h6>
                    <p>We may use cookies and other technologies to facilitate and track your use of services offered on this website and in connection with our email communications. For more information on this, please see our privacy notice.</p>

                    <h6>Customer Reviews</h6>
                    <p>Completed reviews may be uploaded onto our website for the sole purpose of informing customers of your opinion of the service and quality of the car hire company, and used partially or in their entirety by easycarrelo.c.nz on our platforms, social media platforms, newsletters, special promotions, mobile applications or other channels owned, hosted, used or controlled by easycarrelo.c.nz. By submitting a review, you are consenting to the above use of your review. We reserve the right to adjust, refuse or remove reviews at our sole discretion.</p>

                    <p>Reviews express the personal opinions of easycarrelo.c.nz customers who filled out a survey after completion of their rental. These opinions do not necessarily represent the views of easycarrelo.c.nz.</p>

                    <p>To the extent permitted, these terms and conditions are governed by English law under the non-exclusive jurisdiction of the courts of England.</p>

                    <p>The General Information and Terms & Conditions stated are correct at the time of going to press.</p>

                    <h6>Protection under the Package Travel Directive</h6>
                    <p>If you book additional travel services from a different service provider for your trip or holiday via a link from our confirmations page, you will NOT benefit from rights applying to packages under Directive (EU) 2015/2302.</p>

                    <p>Therefore, easycarrelo.c.nz will not be responsible for the proper performance of those additional travel services. In case of problems please contact the relevant service provider.</p>

                    <p>However, if you book additional travel services via a link not later than 24 hours after receiving the confirmation of the booking from easycarrelo.c.nz, and those additional travel services amount to 25% or more of the combined value of both bookings, those travel services will become part of a linked travel arrangement. In that case easycarrelo.c.nz has, as required by EU law, protection in place to refund payments you have made to easycarrelo.c.nz for services not performed because of easycarrelo.c.nz's insolvency. Please note that this does not provide a refund in the event of the insolvency of the relevant service provider.</p>

                    <p>easycarrelo.c.nz has taken out insolvency protection with Travel & General Insurance Services Limited (t&g), registered number 02527363 and underwritten by Hiscox Insurance Company Limited (Hiscox), registered number 00070234. t&g and Hiscox are authorised and regulated by the Financial Conduct Authority and the Prudential Regulation Authority (number 113849).</p>

                    <p>Authority and the Prudential Regulation Authority (number 113849).</p>

                    <p>Travellers may contact this entity or, where applicable, the competent authority claims helpline on 01702 811397 (A copy of the policy is available on request from the Policyholder) if the services are denied because of Rentalcars.com’s insolvency.</p>

                    <p><strong>Note:</strong> This insolvency protection does not cover contracts with parties other than easycarrelo.c.nz, which can be performed despite easycarrelo.c.nz's insolvency.</p>
                </div>
            </div>
        </div>
    )
}