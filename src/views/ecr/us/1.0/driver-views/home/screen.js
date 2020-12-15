import React, { useEffect, useState } from 'react';
import { Field, Form } from "redux-form";
import "./style.scss";
import { SearchVehicle } from '../search-vehicle'
import { AdvanceSearchVehicle } from '../advance-search'
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";

const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const { FormWrapper } = require(`../../../../../../components/${PLATFORM}/hoc/form-wrapper`);
const { CountTeller } = require(`../../../../../../components/${PLATFORM}/atoms/count-teller`);
const {
    DASHBOARD_PAGE_LOGO,
    ROLE_STATS_ICONS,
    PAGE_TITLES,
    SUB_ADMIN_PLATFORM,
    ROUTES
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { DecisionPopup } = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`);
// const { NotificationComponent } = require(`../../../../../../components/${PLATFORM}/atoms/push-notification`);

const DashboardScreen = (props) => {
    let history = useHistory();
    const [popupVisible, setPopVisible] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [openSnackBar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        if (!props.isGeolocationAvailable) {
            console.log('our browser does not support Geolocation', props.isGeolocationAvailable)
        }
        if (!props.isGeolocationEnabled) {
            console.log('Geolocation is not Enabled', props.isGeolocationAvailable)
        }
        if (props.coords && props.coords.latitude) {
            setLocation()
        }

    }, [props.coords])

    const setLocation = () => {
        if (props.coords && props.coords.latitude) {
            Geocode.setApiKey("AIzaSyCwe-4k_nGXdLcNt9YcIy0WeJzlL1Ot77k");
            (Geocode.fromLatLng(props.coords.latitude, props.coords.longitude).then(
                response => {
                    response.results[0].address_components.map(address => {
                        let formatted_address = response.results[0].formatted_address
                        if (address.types[0] === "locality") {
                            let city = address.long_name
                            props.setUpPickUpLocation({ ...props.DriverReducer.pickup_Data, PickupLocation: formatted_address, City: city, DropOffLocation: '' })
                        }
                        else {
                            if (address.types[0] === "administrative_area_level_1") {
                                let city = address.long_name
                                props.setUpPickUpLocation({ ...props.DriverReducer.pickup_Data, PickupLocation: formatted_address, City: city, DropOffLocation: '' })
                            }
                        }
                    })
                },
                error => {
                    console.error(error);
                }
            ))
        }
    }

    const showadvanceSearch = () => {
        var x = document.getElementById('advance-search-vehicle');
        var y = document.getElementById('advance_btn');
        if (x.style.display === "none") {
            x.style.display = "block";
            y.style.display = "none";
        } else {
            x.style.display = "none";
            y.style.display = "block";
        }
    }

    const search_Vehicle = (postData) => {
        if ((postData.pickupDate === null || postData.pickupDate === '') || postData.fromCity === '') {
            setPopVisible(true)
        }
        else {
            let fuelTypeStr = postData.fuelType || []
            let vehicleTypeStr = postData.vehicleType || []
            let transmissionOptionStr = postData.transmissionOption || []
            Object.keys(postData)
                .map(k => {
                    if (postData[k] === "" || postData[k] === 0) {
                        delete postData[k]
                        delete postData['fuelType']
                        delete postData['vehicleType']
                        delete postData['transmissionOption']
                    }
                })

            let query = Object.keys(postData)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(postData[k])).join('&');

            if (fuelTypeStr.length !== 0) {
                query = `${query}&fuelType=[${fuelTypeStr}]`
            }
            if (vehicleTypeStr.length !== 0) {
                query = `${query}&vehicleType=[${vehicleTypeStr}]`
            }
            if (transmissionOptionStr.length !== 0) {
                query = `${query}&transmissionType=[${transmissionOptionStr}]`
            }

            props.searchVehicle(query, (response) => {
                history.replace(ROUTES.SEARCH_VEHICLE_LIST)
            }, (error) => {
                setSnackBarData({
                    variant: error.status ? 'success' : 'error',
                    message: error.msg || 'error'
                });
                setOpenSnackbar(true)
            })
        }
    }

    const browseVehicle = (searchObj) => {
        props.setUpPickUpLocation({
            PickupLocation: searchObj._id.fromCity,
            City: searchObj._id.fromCity,
            DropOffLocation: searchObj._id.toCity
        })
        let postData = {
            fromCity: searchObj._id.fromCity,
            toCity: searchObj._id.toCity,
            limit: STRINGS.VEHICLE_LIMIT,
            index: STRINGS.INDEX,
        }

        search_Vehicle(postData)
    }

    useEffect(() => {
        let postData = { sortOrder: STRINGS.SORT_ORDER, limit: STRINGS.LIMIT }
        props.getPopularPlaces(postData, (error) => {
            setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg || 'error'
            });
            setOpenSnackbar(true)
        })
    }, [])

    return (
        <>
            <DecisionPopup
                modalVisibility={popupVisible}
                dialogContent={((!props.DriverReducer.pickup_Data.PickupDate || props.DriverReducer.pickup_Data.PickupDate === null) &&
                    (!props.DriverReducer.pickup_Data.PickupLocation || props.DriverReducer.pickup_Data.PickupLocation === '')) ?
                    STRINGS.PICKUP_CONTENT : ((!props.DriverReducer.pickup_Data.PickupDate || props.DriverReducer.pickup_Data.PickupDate === null) ? STRINGS.PICKUPDATE_CONTENT :
                        ((!props.DriverReducer.pickup_Data.PickupLocation || props.DriverReducer.pickup_Data.PickupLocation === '') ? STRINGS.PICKUPDLOCATION_CONTENT : ''))}
                confirmButtonTitle={STRINGS.OKAY}
                dialogTitle={((!props.DriverReducer.pickup_Data.PickupDate || props.DriverReducer.pickup_Data.PickupDate === null)
                    && (!props.DriverReducer.pickup_Data.PickupLocation || props.DriverReducer.pickup_Data.PickupLocation === '')) ?
                    STRINGS.BOTH_PICKUP : ((!props.DriverReducer.pickup_Data.PickupDate || props.DriverReducer.pickup_Data.PickupDate === null) ?
                        STRINGS.PICKUPDATE : ((!props.DriverReducer.pickup_Data.PickupLocation || props.DriverReducer.pickup_Data.PickupLocation === '')
                            ? STRINGS.PICKUPLOCATION : ''))}
                toggleDialogModal={() => setPopVisible(!popupVisible)}
                onConfirmation={() => {
                    setPopVisible(false)
                }}
            />
            <Helmet>
                <title>{PAGE_TITLES.dashboard}</title>
            </Helmet>

            <div className="clearfix"></div>
            {/* <NotificationComponent /> */}
            <div className={props.CommonReducer.userToken === '' || props.CommonReducer.userToken === null ? 'popluar_relocation_sec popluar_header' : 'popluar_relocation_sec'}>
                <div className="container">
                    <SnackbarWrapper
                        visible={openSnackBar}
                        onClose={() => setOpenSnackbar(false)}
                        variant={snackbarData.variant}
                        message={snackbarData.message}
                    />
                    <div className='popular-search'>
                        <div className="popluar_fields">
                            <FormWrapper formWrapperStyle='search-vehicle'>
                                <SearchVehicle setPopVisible={setPopVisible}
                                    onSubmit={(postData) => {
                                        search_Vehicle(postData)
                                    }}
                                />
                            </FormWrapper>
                        </div>
                        <div className="text-center"><a onClick={showadvanceSearch} id="advance_btn" className="advance_btn">Advanced Search</a></div>
                        <div id="advance-search-vehicle" style={{ display: 'none' }}> <AdvanceSearchVehicle
                            setPopVisible={setPopVisible}
                            onSubmit={(postData) => {
                                search_Vehicle(postData)
                            }}
                        /> </div>
                    </div>
                </div>
            </div>

            <div className="main_section vehical_head">
                <div className="container">
                    <div className="title_loc text-center">
                        <h5>Popular Relocations</h5>
                    </div>

                    <div className="row align-items-center justify-content-center">
                        {props.DriverReducer.popularPlacesListing ?
                            props.DriverReducer.popularPlacesListing.map((place, index) => {
                                return (<div className="col-md-4" key={index}>
                                    <div className="loc_block text-center">
                                        <i><img src={require(`../../../../../../assets/driver/icons/window-tinting_icon.svg`)} alt="ECR" className="img-fluid" width="80px" /></i>
                                        <span>{place._id.fromCity} to {place._id.toCity}</span>
                                        <h4>{place.count}</h4>
                                        <span>Relocations Available</span>
                                        <a className="btn btn-lg btn-primary" onClick={() => browseVehicle(place)}>Browse</a>
                                    </div>
                                </div>)
                            }) : ''
                        }
                    </div>
                </div>

                <div className="clearfix"></div>

                <div className="helpful-sec">
                    <div className="container">
                        <div className="col-md-12 text-center mb-5">
                            <h5>Helpful Information</h5>
                        </div>
                        <div className="row align-items-top justify-content-between">
                            <div className="col-lg-6">
                                <div className="sumary_block">
                                    <i><img src={require(`../../../../../../assets/driver/icons/vehicle-home.svg`)} alt="ECR" className="img-fluid" width="85px" /></i>
                                    <h5>How relocation works:</h5>
                                    <p>Vehicle relocation is a great opportunity to save on your travels. Rental vehicle companies usually need to move vehicles between cities and sometimes between islands. With that, vehicles are offered here at for free or at a low rate and you can request one to be relocated from the origin city to the destination city. Some relocation options will include fuel and ferry cost but others won’t. You will find details on each listing. Don’t wait, book your relocation vehicle today and save</p>
                                </div>
                                <div className="sumary_block">
                                    <i><img src={require(`../../../../../../assets/driver/icons/Drivers-Icon.svg`)} alt="ECR" className="img-fluid" width="85px" /></i>
                                    <h5>Can I relocate a vehicle?</h5>
                                    <p>To relocate a vehicle you will need to be over 21 years of age and have a full drivers licence for at least 1 year without any restrictions. That’s it!</p>
                                </div>
                                <div className="text-center text-md-left help_btn" onClick={() => history.replace(ROUTES.HOW_IT_WORK)}>
                                    <a>Click here for more helpful information</a>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="video_play">
                                    <video controls autoPlay>
                                        <source src="" type="video/mp4" />
                                        <source src="" type="video/ogg" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const Screen = geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(DashboardScreen)