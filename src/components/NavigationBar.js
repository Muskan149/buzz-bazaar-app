import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Router>
        <header>
        <Link to="/index">
                <img src="static/img/logo.jpeg" style={{ height: '65px', width: 'auto' }} />
        </Link>
            <nav>
            <ul>
                <li> <Link to="/login" target="_blank">Login</Link></li>
                <li>
                    <Link to={{ pathname: "https://youtube.com/" }} target="_blank"></Link>
                </li>
                <li><a href="mailto:buzzbazaar13@gmail.com" target="_blank">Contact</a></li>
            </ul>
        </nav>
        </header>
        </Router>
    );
};

export default NavigationBar;
