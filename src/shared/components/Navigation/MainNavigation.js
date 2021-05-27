import React, { useState } from 'react';

import MainHeader from './MainHeader';
import Navlinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import { FacebookSvg, GithubSvg, InstagramSvg, LineSvg, LogoSvg, TwitterSvg } from '../../../assets/svgs/svgs';
import './MainNavigation.css';

const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
            <div className="upper-header">
                <div className="left">
                    <LogoSvg />
                    <p>Sign<span>Detect</span></p>
                </div>
                <div className="right">
                    <FacebookSvg />
                    <LineSvg />
                    <TwitterSvg />
                    <LineSvg />
                    <InstagramSvg />
                    <LineSvg />
                    <GithubSvg />
                </div>
            </div>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <Navlinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <nav className="main-navigation__header-nav">
                    <Navlinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;