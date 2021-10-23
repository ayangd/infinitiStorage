import { matchPath, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { logout, useUser } from '../../lib/auth';
import './style.scss';

function Navbar() {
    const location = useLocation();
    const user = useUser();
    const match = matchPath(location.pathname, {
        path: '/(login|register)',
        exact: true,
    });

    if (match !== null) {
        return <></>;
    }

    return (
        <div className="navbar-layout-container">
            <div className="navbar-left">infinitiStorage</div>
            <div className="navbar-right">
                {user ? (
                    <>
                        {`Welcome ${user.lastName}`}&nbsp;&nbsp;
                        <button className="btn" onClick={() => logout()}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        <button className="btn">Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;
