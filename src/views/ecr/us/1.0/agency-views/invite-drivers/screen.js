import React, { useEffect, useState } from 'react';
import './styles.scss';
import {
    FacebookShareButton,
    TwitterShareButton,
} from "react-share";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    ROUTES,
    REMOVE_ICON
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { Autocomplete } = require(`../../../../../../components/${PLATFORM}/atoms/auto-complete`)
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);

export const InviteScreen = ({
    history,
    dashboardData,
    setFormStep1Data,
    setFormStep2Data,
    setFormStep3Data,
    getDrivers,
    newListId,
    savedDrivers = [],
    saveStepNo = () => { },
    inviteDrivers = () => { },
    newListingId = () => { }
}) => {

    const [receivedDrivers, setReceivedDrivers] = useState([])
    const [selectedDrivers, setSelectedDrivers] = useState([])
    const [autoCompleteData, setAutoCompleteData] = useState({
        activeOption: 0,
        filteredOptions: [],
        showOptions: true,
        userInput: '',
        options: [],
    })
    useEffect(() => {
        const tempReceivedDrivers = []
        for (let index = 0; index < savedDrivers.length; index++) {
            let isInclude = false
            if (!!(savedDrivers[index].driverData)) {
                for (let innerIndex = 0; innerIndex < selectedDrivers.length; innerIndex++) {
                    if ((selectedDrivers[innerIndex] && selectedDrivers[innerIndex].email) === ((savedDrivers[index] && savedDrivers[index].driverData && savedDrivers[index].driverData.email))) {
                        isInclude = true
                    }
                }

                if (!isInclude) {
                    tempReceivedDrivers.push({ name: savedDrivers[index] && savedDrivers[index].driverData && savedDrivers[index].driverData.name, email: savedDrivers[index] && savedDrivers[index].driverData && savedDrivers[index].driverData.email })
                }
            }
        }
        setReceivedDrivers([...tempReceivedDrivers])

    }, [savedDrivers, receivedDrivers && receivedDrivers.length])

    useEffect(() => {
        return (() => {
            newListingId('')
        })
    }, [])

    const [modalVisibility, setModalVisibility] = useState(false)
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });

    const onSelect = (receivedDriver) => {
        let tempSelectedDrivers = selectedDrivers
        let isInclude = false;

        if (!!receivedDriver) {
            for (let index = 0; index < tempSelectedDrivers.length; index++) {
                if ((tempSelectedDrivers[index] && tempSelectedDrivers[index].name && tempSelectedDrivers[index].name.toLowerCase && tempSelectedDrivers[index].name.toLowerCase()) === (receivedDriver && receivedDriver.name && receivedDriver.name.toLowerCase && receivedDriver.name.toLowerCase())) {
                    isInclude = true
                }

            }
            if (!isInclude) {
                tempSelectedDrivers.push(receivedDriver)
            }
            setSelectedDrivers([...tempSelectedDrivers])
        }
    }

    const url = `https://www.easycarrelo.co.nz/listing?id=${newListId}`
    const shareUrl = url;
    const title = 'Easy car relo';

    return (
        <div className={'app-main_outer'}
            onClick={() => {
                setAutoCompleteData({
                    ...autoCompleteData, showOptions: false
                })
            }}
        >
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <div className="container-fluid">
                <div className="list_added">
                    <h4 className="mb-5">Congratulations, your new listing will be live soon</h4>

                    <div className="form-fields">
                        <label>Would you like to invite your favorite drivers to consider this new listing?</label>
                        <div class="form-row mb-4 mb-md-5">
                            <div className="col-md-4 search_block">
                                <div className="form-group"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                >
                                    <Autocomplete
                                        options={receivedDrivers}
                                        autoCompleteData={autoCompleteData}
                                        onChange={
                                            (e) => {
                                                getDrivers(e.currentTarget.value)
                                                const filteredOptions = receivedDrivers.filter(
                                                    (optionName) => {
                                                        const { name } = optionName
                                                        return name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
                                                    }
                                                );
                                                setAutoCompleteData({ ...autoCompleteData, userInput: e.target.value, showOptions: true, activeOption: 0 })
                                            }
                                        }
                                        onFocus={() => {
                                            getDrivers(autoCompleteData && autoCompleteData.userInput)
                                            setAutoCompleteData({ ...autoCompleteData, showOptions: true, activeOption: 0 })
                                        }}
                                        onKeyDown={(e) => {
                                            const { activeOption, filteredOptions } = autoCompleteData;

                                            if (e.keyCode === 13) {
                                                setAutoCompleteData({
                                                    ...autoCompleteData,
                                                    activeOption: 0,
                                                    showOptions: false,
                                                    userInput: ''
                                                })
                                                onSelect(receivedDrivers[activeOption])
                                            } else if (e.keyCode === 38) {

                                                if (activeOption === 0) {
                                                    return;
                                                }
                                                setAutoCompleteData({
                                                    ...autoCompleteData,
                                                    activeOption: activeOption - 1
                                                })
                                            } else if (e.keyCode === 40) {
                                                if (activeOption === (receivedDrivers && (receivedDrivers.length - 1))) {
                                                    return;
                                                }

                                                setAutoCompleteData({
                                                    ...autoCompleteData,
                                                    activeOption: activeOption + 1
                                                })
                                                // }
                                            }
                                        }
                                        }
                                        onClick={(e) => {
                                            let valueToSend;

                                            const filteredOptions = receivedDrivers.filter(
                                                (optionName, index) => {
                                                    const { name } = optionName
                                                    if ((name && name.toLowerCase && name.toLowerCase()) === ((e.currentTarget.innerText).toLowerCase && (e.currentTarget.innerText).toLowerCase())) {
                                                        valueToSend = index
                                                    }
                                                }
                                            );

                                            setAutoCompleteData({
                                                ...autoCompleteData,
                                                activeOption: 0,
                                                filteredOptions: [],
                                                showOptions: false,
                                                userInput: ''
                                            })
                                            onSelect(receivedDrivers[valueToSend])
                                        }
                                        }
                                        // onValueChange={(data) => {
                                        //     setUserInput(data)
                                        // }}
                                        // getDrivers={getDrivers}
                                        // onSelect={(receivedDriver) => {
                                        //     let tempSelectedDrivers = selectedDrivers
                                        //     let isInclude = false;
                                        //     for (let index = 0; index < tempSelectedDrivers.length; index++) {
                                        //         if (tempSelectedDrivers[index] && tempSelectedDrivers[index].name.toLowerCase() === receivedDriver.name.toLowerCase()) {
                                        //             isInclude = true
                                        //         }

                                        //     }
                                        //     if (!isInclude) {
                                        //         tempSelectedDrivers.push(receivedDriver)
                                        //     }
                                        //     setSelectedDrivers([...tempSelectedDrivers])
                                        // }}
                                        // selectedDrivers={selectedDrivers}

                                        placeholder={"Search your past drivers"}
                                    />
                                </div>

                                <ul className="remove_selected">
                                    {(!!selectedDrivers.length) && selectedDrivers.map((item, index) => {
                                        return (
                                            <li key={index + ''}><i
                                                onClick={() => {
                                                    let tempSearchValue = selectedDrivers
                                                    tempSearchValue.splice(index, 1)
                                                    setSelectedDrivers([...tempSearchValue])
                                                }}
                                            ><img src={REMOVE_ICON} alt="" /></i>{` ${item && item.name}`}</li>
                                        )
                                    })}
                                    {/* <li
                                        onClick={() => {
                                            let tempSearchValue = selectedDrivers
                                            tempSearchValue.pop()
                                            setSelectedDrivers([...tempSearchValue])
                                        }}
                                    ><i><img src={REMOVE_ICON} alt="" /></i> John Williams</li>
                                    <li><i><img src={REMOVE_ICON} alt="" /></i> Sarah Scott</li>
                                    <li><i><img src={REMOVE_ICON} alt="" /></i> Paul Jomes</li> */}
                                </ul>

                                <div className="invite_drivers mt-3">
                                    <button className="btn btn-md btn-primary"
                                        disabled={selectedDrivers && selectedDrivers.length === 0 ? true : false}
                                        onClick={() => {
                                            let toAddresses = []
                                            selectedDrivers.filter((item) => {
                                                toAddresses.push(item.email)
                                            })

                                            inviteDrivers({
                                                toAddresses,
                                                url: url,
                                                id: newListId
                                            },
                                                (response) => {
                                                    setSnackBarData({
                                                        variant: response.status ? 'success' : 'error',
                                                        message: response.msg || 'error'
                                                    });
                                                    setOpenSnackbar(true)
                                                    setModalVisibility(false)

                                                }, (response) => {
                                                    setSnackBarData({
                                                        variant: response.status ? 'success' : 'error',
                                                        message: response.msg || 'error'
                                                    });
                                                    setOpenSnackbar(true)
                                                }
                                            )
                                        }}
                                    >Invite Selected Drivers</button>
                                </div>
                            </div>
                        </div>

                        <div class="form-row mb-3 mb-md-5">
                            <div className="col-md-6">
                                <label>Share this new listing on you social networks</label>
                                <div className="form-group">
                                    <div className="social_share">
                                        <FacebookShareButton
                                            url={shareUrl}
                                            quote={title}
                                            // image={exampleImage}
                                            className="Demo__some-network__share-button"
                                        >
                                            <a href="#" className="btn btn-md btn-outline-grey">Facebook </a>
                                        </FacebookShareButton>
                                        <TwitterShareButton
                                            url={shareUrl}
                                            quote={title}
                                            className="Demo__some-network__share-button">
                                            <a href="#" className="btn btn-md btn-outline-grey">Twitter </a>
                                        </TwitterShareButton>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="btn-groups">
                        <button className="btn btn-lg btn-primary"
                            onClick={() => {
                                saveStepNo(1)
                                setFormStep1Data({})
                                setFormStep2Data({})
                                setFormStep3Data({})
                                history.replace(ROUTES.ADD_NEW_LIST)
                            }}
                        >Add a new listing</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

