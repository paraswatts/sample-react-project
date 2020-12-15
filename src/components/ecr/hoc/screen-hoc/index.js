import React, { useState } from 'react';
import { Loader } from '../../atoms/loader';
import AppDrawer from '../../atoms/app-drawer';
import './style.scss';
import { connect } from 'react-redux';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../config/default`);

const HOC = ({
    containerStyle,
    containerId = 'screen-hoc-container',
    contentId = 'screen-content',
    childrenStyle,
    onClickAction = () => { },
    drawerId = 'app-drawer',
    drawerItems,
    companyLogo,
    topShape,
    bottomShape,
    hamburgerIcon,
    headerLogo,
    children,
    loader = false,
    backArrow,
    ROUTES = [],
    drawerVisible,
    headerLogoAction,
    onAddNewListing = () => { },
    totalToken,
    USER_ROLES,
    role,
    setDrawerVisible,
    logoImage
}) => {
    React.useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 1024) {
                setDrawerVisible(false);
                return;
            }
            else if (window.innerWidth >= 1024) {
                setDrawerVisible(true);
                return;
            }
        });
    })

    const responsiveScroll = () => { }

    return (
        <div id={containerId} className={containerStyle} onScroll={responsiveScroll}>
            {/* <AppHeader
                hamburgerIcon={hamburgerIcon}
                headerLogo={headerLogo}
                hamburgerVisible={drawerVisible ? window.innerWidth < 1025 ? true : false : true}
                menuItems={[
                    ...HEADER_MENU_ITEMS,
                    {
                        label: STRINGS.LOG_OUT,
                        routeUrl: ROUTES.LOGOUT,
                        onClick: (changedUrl) => {
                            onClickAction(changedUrl)
                        }
                    }
                ]}
                onHamburgerClick={(e) => {
                    setDrawerVisible(!drawerVisible);
                    e.stopPropagation()
                }}
            /> */}
            <AppDrawer
                drawerId={drawerId}
                onAddNewListing={onAddNewListing}
                drawerItems={drawerItems}
                companyLogo={companyLogo}
                topShape={topShape}
                role={role}
                USER_ROLES={USER_ROLES}
                ROUTES={ROUTES}
                totalToken={totalToken}
                drawerVisible={drawerVisible}
                setDrawerVisible={(value) => { setDrawerVisible(value) }}
                onClickAction={(changedUrl) => {
                    onClickAction(changedUrl);
                    window.innerWidth < 1024 && setDrawerVisible(false)
                }}
                bottomShape={bottomShape}
                // toggleDrawer={() => { setDrawerVisible(!drawerVisible); }}
                backArrow={backArrow}
            />

            <div id={contentId} className={childrenStyle} onClick={(e) => { window.innerWidth < 1024 && setDrawerVisible(false) }}>
                {children}
                {loader &&
                    <Loader />
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
    });
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export const ScreenHOC = connect(mapStateToProps, mapDispatchToProps)(HOC);