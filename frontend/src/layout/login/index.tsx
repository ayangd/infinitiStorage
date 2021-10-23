import { useState } from 'react';
import './style.scss';
import * as auth from '../../lib/auth';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function login() {
        auth.login(email, password).then((loggedIn) => history.push('/'));
    }

    return (
        <div className="login-layout-container">
            <div className="login-container">
                <div className="login-title">Login</div>
                <div className="login-form-group">
                    <span>Email:</span>
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="login-form-group">
                    <span>Password:</span>
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login-centered">
                    Don't have an account yet?
                    <br />
                    <Link to="/register">Register here</Link>.
                </div>
                <button className="btn" onClick={login}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
