import { faBell, faBriefcase, faHouse, faPlus, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAuth } from './security/AuthContext';
import NotificationComponent from './NotificationComponent';
import CodeFormComponent from './CodeFormComponent';
import { useEffect, useRef, useState } from 'react';

export default function HeaderComponent() {

    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated();
    const [showNotification, setShowNotification] = useState(false);
    const [showCodeForm, setShowCodeForm] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
              setShowNotification(false);
              setShowCodeForm(false);
            }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [])

    function logout() {
        authContext.logout();
    }

    function handleShowNotification() {
        setShowNotification(!showNotification);
        setShowCodeForm(false);
    }

    function handleShowCodeForm() {
        setShowCodeForm(!showCodeForm);
        setShowNotification(false);
    }

    return (
        <div>
            {showCodeForm && <CodeFormComponent ref={formRef} />}
            <header className='border-bottom border-light border-5 mb-3 p-2'>
                <div className='container'>
                    <div className='row'>
                        <nav className='navbar navbar-expand-lg'>
                            <a className='navbar-brand ms2 fs-2 fw-bold text-black' href="/home">Executive Insight</a>
                            <div className='collapse navbar-collapse'>
                                <ul className='navbar-nav'>
                                    <li className='nav-item'>
                                        {isAuthenticated && <Link className='nav-link mx-2' to="/home"><FontAwesomeIcon icon={faHouse} /></Link>}
                                    </li>
                                    <li className='nav-item'>
                                        {isAuthenticated && <a className='nav-link mx-2' href="/my-workspace"><FontAwesomeIcon icon={faBriefcase} /></a>}
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
                                    {isAuthenticated && <Link className='nav-link mx-2' onClick={handleShowCodeForm} ref={formRef}><FontAwesomeIcon icon={faPlus} /></Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link mx-2' onClick={handleShowNotification} ref={formRef}><FontAwesomeIcon icon={faBell} /></Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <a className='nav-link mx-2' href="/user-profile"><FontAwesomeIcon icon={faUser} /></a>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <a className='nav-link mx-2' href="/logout" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /></a>}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            {showNotification && <NotificationComponent ref={formRef} />}
            </div>
    )
}