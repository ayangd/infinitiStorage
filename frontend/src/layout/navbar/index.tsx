import { Button } from '@chakra-ui/button';
import { matchPath, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { logout, useUser } from '../../lib/auth';
import { NavbarLayoutContainer } from './container-components';

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
        <NavbarLayoutContainer>
            <div>
                <Link to="/">infinitiStorage</Link>
            </div>
            <div>
                {user ? (
                    <>
                        {`Welcome ${user.lastName}`}&nbsp;&nbsp;
                        <Button
                            colorScheme="red"
                            className="btn"
                            onClick={() => logout()}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Link to="/login">
                        <Button colorScheme="teal" className="btn">
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </NavbarLayoutContainer>
    );
}

export default Navbar;
