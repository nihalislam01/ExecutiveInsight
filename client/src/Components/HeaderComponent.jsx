import { Link } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

export default function HeaderComponent() {

    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated();

    function logout() {
        authContext.logout();
    }

    return (
        <header className='border-bottom border-light border-5 mb-5 p-2'>
            <div className='container'>
                <div className='row'>
                    <nav className='navbar navbar-expand-lg'>
                        <a className='navbar-brand ms2 fs-2 fw-bold text-black' href="/home">Executive Insight</a>
                        <div className='collapse navbar-collapse'>
                            <ul className='navbar-nav'>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link' to="/home">Home</Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link' to="/my-workspace">My Workspace</Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link' to="/home">Notification</Link>}
                                </li>
                            </ul>
                        </div>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                {!isAuthenticated && <Link className='nav-link' to="/login">Login</Link>}
                            </li>
                            <li className='nav-item'>
                                {!isAuthenticated && <Link className='nav-link' to="/signup">Signup</Link>}
                            </li>
                            <li className='nav-item'>
                                {isAuthenticated && <Link className='nav-link' to="/workspace-code"><span>+</span></Link>}
                            </li>
                            <li className='nav-item'>
                                {isAuthenticated && <a className='nav-link' href="/logout" onClick={logout}>Logout</a>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}