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
const AppDrawer = ({
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
    ROUTES = [],
    onAddNewListing = () => { },
    toggleDrawer = () => { },
    totalToken,
    role,
    USER_ROLES,
    setDrawerVisible = () => { },
    ...props
}) => {
    const location = useLocation()
    const history = useHistory()



    const [isActive, updateStatus] = useState(0);
    return (
        <Drawer
            variant="persistent"
            anchor={'left'}
            open={drawerVisible}
            onClose={() => toggleDrawer(false)}
            classes={{}}
            ModalProps={{
                keepMounted: true,
            }}
            className='drawer-menu'>

            <div id={drawerId} className={classNames([drawerViewStyle, 'drawer-view'])}>

                <div className="sidebar_nav">
                    <ul className="vertical-nav-menu">
                        <li className="heading_menu">
                            <h6>Account Settings</h6>
                        </li>
                        <li>
                            <ul>
                                {/* <li className="active-tab"><a>Company Details</a></li> */}
                                {
                                    drawerItems.map((item, index) => {
                                        return (
                                            <li key={index + ''} className={`${location && location.pathname == item.routeUrl && "active-tab"}`} ><a onClick={() => {
                                                history.replace(item.routeUrl)
                                                window.innerWidth < 1024 && setDrawerVisible(false)
                                            }}>{item.label}</a></li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                        <li className="heading_menu">
                            <h6>Token: {totalToken}</h6>
                        </li>
                        {

                            !!(role === USER_ROLES.AGENCY) && <li className="heading_menu"
                                onClick={() => {
                                    history.push(ROUTES.TOKEN)
                                    window.innerWidth < 1024 && setDrawerVisible(false)
                                }}>
                                <a>Buy Tokens</a>
                            </li>
                        }
                        <li>
                            <a className="list_menu"
                                onClick={() => {
                                    onAddNewListing()
                                    history.push(ROUTES.ADD_NEW_LIST)
                                    window.innerWidth < 1024 && setDrawerVisible(false)
                                }}
                            >Add a new listing</a>
                        </li>
                    </ul>
                </div>
            </div>
        </Drawer>
    )
}

export default AppDrawer;