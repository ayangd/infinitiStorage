import { useState } from 'react';
import * as auth from '../../lib/auth';
import { useHistory } from 'react-router';
import './style.scss';

function Register() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    function register() {
        if (password !== confirmPassword) {
            setAlertMessage('Please retype the confirm password');
            return;
        }
        auth.register({
            email,
            password,
            firstName,
            lastName,
        })
            .then(() => {
                history.push('/');
            })
            .catch((err) => {
                setAlertMessage(err.message);
            });
    }

    return (
        <div className="register-layout-container">
            <div className="register-container">
                <div className="register-title">Register</div>
                <div
                    className="register-alert"
                    style={{ display: alertMessage.length === 0 ? 'none' : '' }}
                >
                    <span className="register-alert-text">{alertMessage}</span>
                    <span
                        className="register-alert-close"
                        onClick={() => setAlertMessage('')}
                    >
                        &times;
                    </span>
                </div>
                <div className="register-form-group">
                    <span>Email:</span>
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <span>Password:</span>
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <span>Confirm Password:</span>
                    <input
                        className="input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <span>First Name:</span>
                    <input
                        className="input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <span>Last Name:</span>
                    <input
                        className="input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <button className="btn" onClick={register}>
                    Register
                </button>
            </div>
        </div>
    );
}

export default Register;
