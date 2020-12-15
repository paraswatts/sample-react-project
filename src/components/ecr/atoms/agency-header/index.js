
import React, { useEffect, useState } from 'react';
import './styles.scss';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const AppHeader = ({ history, ROUTES, props, onClickAction,
    toggleDrawer,
    agencyLogo,
    companyLogo,
    accountIcon,
    hamburgerIcon
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    let openMenu = Boolean(anchorEl)

    useEffect(() => {
        setAppHeader(props.userToken)
    }, [props && props.userToken])
    const [appHeader, setAppHeader] = useState(props && props.userToken)

    return (
        <header className="admin-header">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-item-right">
                    <div className="logo-admin">
                        <a className="logo d-inline-block" onClick={() => {
                            history.replace(ROUTES.DASHBOARD)
                        }}>
                            <img src={companyLogo} alt="ECR" className="img-fluid" width="160px" />
                        </a>
                    </div>
                    <div className="d-flex align-items-center sidebar_header text-right">
                        <div className="d-flex align-items-center sidebar_header text-right">
                            {!!(agencyLogo && agencyLogo.userAgency && agencyLogo.userAgency.logo) ? <img
                                className={'logo-class'}
                                // style={{ fontSize:}}
                                src={(agencyLogo && agencyLogo.userAgency && agencyLogo.userAgency.logo)}
                                onClick={(event) => {
                                    setAnchorEl(event.currentTarget)
                                }}
                            /> :

                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"

                                    onClick={(event) => {
                                        setAnchorEl(event.currentTarget)
                                    }}
                                >
                                    <AccountCircleIcon fontSize="large" fill="#fffff" />
                                </IconButton>}
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
                                    history.replace(ROUTES.AGENCY_PROFILE)
                                    setAnchorEl(null)
                                }}>
                                    Profile
                       </MenuItem>
                                <MenuItem onClick={onClickAction}>
                                    Log out
                       </MenuItem>
                            </Menu>
                            <div className="my-account">
                                <span><img src={accountIcon} alt="ECR" className="img-fluid" width="40px" /></span>
                            </div>
                            {(history.location.pathname === ROUTES.DRIVER_PROFILE || history.location.pathname === ROUTES.DRIVER_RATINGS
                                || history.location.pathname === ROUTES.DRIVER_TRIPS) ? <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                                    onClick={() => { toggleDrawer() }}
                                >
                                    <span><img src={hamburgerIcon} alt="ECR" className="img-fluid" width="40px" /></span>
                                </button> : ''}
                        </div>
                        <div className="d-flex align-items-center sidebar_header text-right">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                                onClick={() => {
                                    toggleDrawer()
                                }}>
                                <span><img src={hamburgerIcon} alt="ECR" className="img-fluid" width="25px" /></span>
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </header>
    );
}