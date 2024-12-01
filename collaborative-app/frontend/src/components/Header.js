import React from 'react';
import styles from '../styles/Header.module.css'; // Updated import path


const Header = () => (
    <header className="header">
        <h1>Collaborative Notes</h1>
        <button className="login-button">Sign In</button>
    </header>
);

export default Header;
