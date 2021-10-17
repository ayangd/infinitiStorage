import { matchPath, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './style.scss';

function Navbar() {
    const location = useLocation();
    const match = matchPath(location.pathname, {
        path: '/login',
        exact: true,
    });

    if (match !== null) {
        return <></>;
    }

    return (
        <div className="navbar-layout-container">
            <div className="navbar-left">infinitiStorage</div>
            <div className="navbar-right">
                <Link to="/login">
                    <button className="btn">Login</button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
