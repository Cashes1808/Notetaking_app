import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Header.module.css';

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                email,
                password,
            });

            const { access, refresh } = response.data;
            // Print tokens to the console 
            console.log('Access Token:', access); 
            console.log('Refresh Token:', refresh);
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            setShowLogin(false);
            setError(null);
            alert('Login successful!');
        } catch (err) {
            setError('Invalid username, email, or password');
            console.error(err);
        }
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>Collaborative Notes</h1>
            <button
                className={styles.loginButton}
                onClick={() => setShowLogin(!showLogin)}
            >
                Sign In
            </button>

            {showLogin && (
                <div className={styles.loginModal}>
                    <h2>Log In</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Submit</button>
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            )}
        </header>
    );
};

export default Header;
