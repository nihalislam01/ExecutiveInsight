import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBriefcase, faHouse, faPlus, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../security/AuthContext';
import { joinWorkspaceApi, updateNotificationApi } from '../../api/ExecutiveInsightApiService';

import NotificationComponent from '../authorized/NotificationComponent';
import CodeFormComponent from '../authorized/CodeFormComponent';

export default function HeaderComponent() {

    const authContext = useAuth();
    const username = authContext.username();
    const isAuthenticated = authContext.isAuthenticated();
    const notifyRef = useRef(null);
    const addRef = useRef(null);
    const [showNotification, setShowNotification] = useState(false);
    const [showCodeForm, setShowCodeForm] = useState(false);

    const logout = () => {
        authContext.logout();
    }

    const handleShowNotification = () => {
        setShowNotification(!showNotification);
        setShowCodeForm(false);
    }

    const handleShowCodeForm = () => {
        setShowCodeForm(!showCodeForm);
        setShowNotification(false);
    }

    const handleReject = (id, email) => {
        if (email===username) {
            var message = `You have rejected the invitation`
        } else {
            message = `You have rejected the request`
        }
        const notification = {
            notificationId: id,
            description: message
        }
        updateNotificationApi(notification)
            .then((response) => {
                setShowNotification(false);
                toast(message, {
                    style: {
                      border: '1px solid #c1121f',
                      color: '#000000',
                    },
                    iconTheme: {
                      primary: '#c1121f',
                      secondary: '#FFFAEE',
                    },
                });
            })
            .catch((error) => {
                console.log(error)
                toast.error("Something went wrong")
            })
    }

    const handleAccept = (id, code, email) => {
        if (email===username) {
            var message = `You have successfully joined the workspace`
        } else {
            message = `User has successfully joined your workspace`
        }
        const notification = {
            notificationId: id,
            description: message
        }
        joinWorkspaceApi(code, email)
            .then((response)=> {
                if (email===username) {
                    toast.success("Workspace joined successfully")
                } else {
                    toast.success("User successfully joined")
                }
            })
            .catch((error) => {
                console.log(error)
                toast.error("Something went wrong")
            })
        updateNotificationApi(notification)
            .then((response) => setShowNotification(false))
            .catch((error) => {
                console.log(error)
                toast.error("Something went wrong")
            })
    }

    return (
        <div>
            <Toaster />
            {showCodeForm && <CodeFormComponent addRef={addRef} setShowCodeForm={setShowCodeForm} />}
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
                                    {!isAuthenticated && <Link className='nav-link' to="/plan">Signup</Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link mx-2' onClick={handleShowCodeForm} ref={addRef} ><FontAwesomeIcon icon={faPlus} /></Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link mx-2' onClick={handleShowNotification} ref={notifyRef}><FontAwesomeIcon icon={faBell} /></Link>}
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
            {showNotification && <NotificationComponent notifyRef={notifyRef} setShowNotification={setShowNotification} handleAccept={handleAccept} handleReject={handleReject} />}
            </div>
    )
}