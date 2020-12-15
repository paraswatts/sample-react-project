import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
} from '@material-ui/core';
import classNames from 'classnames';
import './style.scss';
import { useLocation, useHistory } from 'react-router-dom'
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../config/default`);
const { ROUTES } = require(`../../../../shared/${PLATFORM}/constants`);

export const DriverDrawer = ({
    drawerItems = [],
    drawerId = 'app-drawer',
    closeAlt = 'close',
    companyLogo,
    topShape,
    bottomShape,
    drawerVisible,
    topShapeAlt = 'top-shape',
    bottomShapeAlt = 'bottom-shape',
    onClickAction = () => { },
    drawerViewStyle = {},
    companyLogoStyle = {},
    listItemStyle = {},
    logoContainerStyle = {},
    drawerIconsStyle = {},
    listTabStyle = {},
    backArrow,
    toggleDrawer = () => { },
    ...props
}) => {
    const location = useLocation()
    const history = useHistory()


    const [isActive, updateStatus] = useState(0);
    const currentUrl = window.location.href;
    return (
        <>
            <Drawer
                variant="persistent"
                anchor={'left'}
                open={drawerVisible}
                onClose={() => toggleDrawer(false)}
                classes={{}}
                ModalProps={{
                    keepMounted: true,
                }}
                className={drawerVisible === true ? 'driver-drawer-menu' : 'show'}
            >

                <div id={drawerId} className={classNames([drawerViewStyle, 'drawer-view'])}>
                    <div className="sidebar_nav">
                        <ul className="vertical-nav-menu">
                            <li className="heading_menu">
                                <h6>My Account</h6>
                            </li>
                            <li>
                                <ul>
                                    {
                                        drawerItems.map((item, index) => {
                                            return (
                                                <li key={index + ''} className={`${location && location.pathname == item.routeUrl && "active-tab"}`} ><a onClick={() => {
                                                    if (item.routeUrl !== 'logout') { history.replace(item.routeUrl) }
                                                    else { onClickAction() }
                                                }}>{item.label}</a></li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                            <li>
                                <a className="btn btn-md btn-primary"
                                    onClick={() => {
                                        history.push(ROUTES.DASHBOARD)
                                    }}
                                >Book a Trip</a>

                            </li>
                        </ul>
                    </div>
                </div>
            </Drawer>
        </>
    )
}