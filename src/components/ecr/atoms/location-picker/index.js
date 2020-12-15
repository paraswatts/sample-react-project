import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";
import { connect } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../config/default`);
const { STRINGS } = require(`../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { setPickUpLocation, getCurrentLocation } = require(`../../../../redux/${PLATFORM}/actions`);

const LocationPicker = (props) => {
    const setLocation = () => {
        const { setUpPickUpLocation, pickup_Data } = props
        var locationInput = document.getElementById('react-google-places-autocomplete-input')
        setUpPickUpLocation({ ...pickup_Data, PickupLocation: locationInput.value, City: locationInput.value })

    }

    useEffect(() => {
        Geocode.setApiKey("AIzaSyCwe-4k_nGXdLcNt9YcIy0WeJzlL1Ot77k")
    }, [])

    return (
        <div onKeyUp={() => { setLocation() }} onKeyDown={() => { setLocation() }}>
            <GooglePlacesAutocomplete
                name={STRINGS.PICKUP_LOCATION_INPUT}
                placeholder={STRINGS.PICKUP_LOCATION_PLACEHOLDER}
                initialValue={props.intialvalue}
                onSelect={(value) => {
                    Geocode.fromAddress(value.description).then(
                        response => {
                            let check_add_component = []
                            let formatted_address
                            response.results[0].address_components.map(address => {
                                formatted_address = response.results[0].formatted_address
                                let obj = {
                                    name: address.long_name,
                                    type: address.types[0]
                                }
                                check_add_component.push(obj)
                            })
                            var locality = check_add_component.find(function (element) {
                                return element.type === 'locality';
                            });

                            if (locality !== undefined) {
                                let city = locality.name
                                props && props.setUpPickUpLocation({ ...props.pickup_Data, PickupLocation: formatted_address, City: city })

                            } else {
                                var admin1 = check_add_component.find(function (element) {
                                    return element.type === 'administrative_area_level_1';
                                });
                                if (admin1 !== undefined) {
                                    let city = admin1.name
                                    props && props.setUpPickUpLocation({ ...props.pickup_Data, PickupLocation: formatted_address, City: city })
                                } else {
                                    var admin2 = check_add_component.find(function (element) {
                                        return element.type === 'administrative_area_level_2';
                                    });
                                    if (admin2 !== undefined) {
                                        let city = admin2.name
                                        props && props.setUpPickUpLocation({ ...props.pickup_Data, PickupLocation: formatted_address, City: city })
                                    } else {
                                        var country = check_add_component.find(function (element) {
                                            return element.type === 'country';
                                        });
                                        if (country !== undefined) {
                                            let city = country.name
                                            props && props.setUpPickUpLocation({ ...props.pickup_Data, PickupLocation: formatted_address, City: city })
                                        } else {
                                            var continent = check_add_component.find(function (element) {
                                                return element.type === 'continent';
                                            });
                                            if (continent !== undefined) {

                                                let city = continent.name
                                                props && props.setUpPickUpLocation({ ...props.pickup_Data, PickupLocation: formatted_address, City: city })
                                            }
                                        }
                                    }
                                }
                            }



                            //             if (add.type === "country") {
                            //                 let city = add.name
                            //                 props && props.setUpPickUpLocation({ ...props.pickup_Data, PickupLocation: formatted_address, City: city })
                            //             } else {
                            //                 if (add.type === "continent") {
                            //                     let city = add.name
                            //                     props && props.setUpPickUpLocation({ ...props.pickup_Data, PickupLocation: formatted_address, City: city })
                            //                 }
                            //             }
                            //         }
                            //     }
                            // })


                        },
                        error => {
                            console.error(error);
                        }
                    );
                }}
            />
        </div>

    )

}

const mapStateToProps = (state, props) => {
    return {
        currentLocation: state.CommonReducer.pickup_location,
        pickup_Data: state.DriverReducer.pickup_Data
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUpPickUpLocation: (data) => {
            dispatch(setPickUpLocation(data))
        },
    }
}

export const LocationSearch = connect(mapStateToProps, mapDispatchToProps)(LocationPicker)