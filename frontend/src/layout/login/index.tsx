import { useState } from 'react';
import './style.scss';
import * as auth from '../../lib/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function login() {
        auth.login(email, password).then((loggedIn) =>
            console.log(`Status: ${loggedIn}`)
        );
    }

    return (
        <div className="login-layout-container">
            <div className="login-container">
                <div className="login-title">Login</div>
                <div className="login-form-group">
                    <span>Email:</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="login-form-group">
                    <span>Password:</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={login}>Login</button>
            </div>
        </div>
    );
}

export default Login;
