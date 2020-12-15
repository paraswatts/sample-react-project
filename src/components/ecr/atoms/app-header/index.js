import React, { useEffect, useState } from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import './style.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
const { searchVehicle, setPickUpLocation,setAdvanceSearchValues } = require('../../../../redux/ecr/actions');

const Header = ({ history, ROUTES, props, onClickAction, drawerVisible, toggleDrawer,
    companyLogo, hamburgerIcon,
    accountIcon, searchVehicle, setUpPickUpLocation,setAdvanceSearchValues
}) => {

    document.getElementsByTagName('body')[0].addEventListener('scroll', () => {

        var midheader = document.getElementById("midHeader");
        if (!!midheader) {
            var sticky = midheader.offsetTop;

            if (document.getElementsByTagName('body')[0].scrollTop > sticky) {
                midheader.classList.add("sticky");
            } else {
                midheader.classList.remove("sticky");
            }
        }
    })


    useEffect(() => {
        setAppHeader(props.userToken)
    }, [props && props.userToken])
    const [appHeader, setAppHeader] = useState(props && props.userToken)
    const [anchorEl, setAnchorEl] = React.useState(null);
    let openMenu = Boolean(anchorEl)
    const [SignUpVisible, setSignupVisible] = useState(false)

    const browseAllVehicles = () => {
        setUpPickUpLocation({})
        setAdvanceSearchValues({Petrol: false, Diesel: false, Electric: false,
            Cars: false, PassengerVans: false, RecreationalVans: false, TrucksAndVans: false,
            Automatic: false, Manual: false, seats: { childSeats: 0, adultSeats: 0 }, freedays: 0,
            fuelType: [], vehicleType: [], transmissionOption: []})
        let query = 'limit=10&index=0'
        searchVehicle(query, (response) => {
            history.replace(ROUTES.SEARCH_VEHICLE_LIST)
        }, (error) => { })
        // console.log(props, 'props')
    }
    return (
        <>
            {!appHeader ?

                <header className="header" >
                    <div className={SignUpVisible === true ? 'header-top d-md-block' : 'header-top d-none d-md-block'} >
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <ul className="d-flex justify-content-center justify-content-sm-start">
                                        <li><a onClick={() => {
                                            history.replace(ROUTES.FAQ)
                                        }}>FAQ's</a></li>
                                        <li><a>Contact</a></li>
                                        <li><a onClick={() => {
                                            history.replace(ROUTES.HOW_IT_WORK)
                                        }}>How does it work?</a></li>
                                    </ul>
                                </div>
                                <div className="col-sm-6 text-center text-sm-right">
                                    <div className="login-btn">
                                        <a className="btn btn-sm btn-outline-white"
                                            onClick={() => {
                                                history.push(ROUTES.LOGIN)
                                            }}
                                        >Sign In</a>
                                        <a className="btn btn-sm btn-outline-white"
                                            onClick={() => {
                                                history.push(ROUTES.REGISTER)
                                            }}
                                        >Sign Up</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'header-mid'} id="midHeader">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-4 text-left mob_logos">
                                    <a className="logo d-inline-block" onClick={() => history.replace(ROUTES.DASHBOARD)}>
                                        <img src={companyLogo} alt="ECR" className="img-fluid" width="160px" />
                                    </a>
                                </div>
                                <div className="col-8 text-right">
                                    <a href="#" onClick={browseAllVehicles} className="browse_all">Browse all vehicles</a>
                                    <div className="my-account">
                                        <span><img src={accountIcon} alt="ECR" className="img-fluid" width="25px" /></span>
                                    </div>
                                    <button className="navbar-toggler pull-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation" onClick={() => {
                                            if (SignUpVisible === true) {
                                                setSignupVisible(false)
                                            } else {
                                                setSignupVisible(true)
                                            }
                                        }}>
                                        <span><img src={hamburgerIcon} alt="ECR" className="img-fluid" width="25px" /></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </header>
                :

                <header className="header">
                    <div className='header-top'>
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-sm-6 col-9">
                                    <ul className="d-flex">
                                        <li><a onClick={() => {
                                            history.replace(ROUTES.FAQ)
                                        }}>FAQ's</a></li>
                                        <li><a>Contact</a></li>
                                        <li><a onClick={() => {
                                            history.replace(ROUTES.HOW_IT_WORK)
                                        }}>How does it work?</a></li>
                                    </ul>
                                </div>

                                <div className="col-sm-6 col-3 text-right profile_icon">
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={(event) => {
                                            setAnchorEl(event.currentTarget)
                                        }}
                                    >
                                        <AccountCircleIcon fontSize="large" fill="#fffff" />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={openMenu}
                                        onClose={() => {
                                            setAnchorEl(null)
                                        }}
                                        PaperProps={{
                                            style: {
                                                maxHeight: 48 * 4.5,
                                                width: '13ch',
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={() => {
                                            history.replace(ROUTES.DRIVER_PROFILE)
                                            setAnchorEl(null)
                                        }}>Profile</MenuItem>
                                        <MenuItem onClick={onClickAction}>Log out</MenuItem>
                                    </Menu>
                                    <div className="my-account">
                                        <span><img src={accountIcon} alt="ECR" className="img-fluid" width="40px" /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'header-mid'} id="midHeader">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-4 text-left mob_logos">
                                    <a className="logo d-inline-block" onClick={() => history.replace(ROUTES.DASHBOARD)}>
                                        <img src={companyLogo} alt="ECR" className="img-fluid" width="160px" />
                                    </a>
                                </div>

                                <div className="col-8 text-right">
                                    <div className="d-flex align-items-center justify-content-end">
                                        <a href="#" onClick={browseAllVehicles} className="browse_all">Browse all vehicles</a>

                                        {(history.location.pathname === ROUTES.DRIVER_PROFILE || history.location.pathname === ROUTES.DRIVER_RATINGS
                                            || history.location.pathname === ROUTES.DRIVER_TRIPS) ? <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                                                onClick={() => { toggleDrawer() }}
                                            >
                                                <span><img src={hamburgerIcon} alt="ECR" className="img-fluid" width="40px" /></span>
                                            </button> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </header>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchVehicle: (data, success, onError) => dispatch(searchVehicle(data, success, onError)),
        setUpPickUpLocation: (data) => dispatch(setPickUpLocation(data)),
        setAdvanceSearchValues: (data) => dispatch(setAdvanceSearchValues(data))
    }
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(Header);