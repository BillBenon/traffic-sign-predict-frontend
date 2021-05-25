import React from 'react';
import { NavLink } from 'react-router-dom';

// import HomeSvg from '../../'
import {HomeSvg, TestSvg, FeedbackSvg} from "../../../assets/svgs/svgs"
import './NavLinks.css';

const NavLinks = props => {

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact><div><i><HomeSvg /></i><p>Home</p></div></NavLink>
            </li>
            <li>
                <NavLink to="/test"><div><i><TestSvg /></i><p>Test the app</p></div></NavLink>
            </li>
            <li>
                <NavLink to="/feedback"><div><i><FeedbackSvg /></i><p>Provide feedback</p></div></NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;