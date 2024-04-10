import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../security/AuthContext';
import { joinWorkspaceApi, updateNotificationApi } from '../../api/ExecutiveInsightApiService';

import NotificationComponent from '../authorized/NotificationComponent';
import CodeFormComponent from '../authorized/CodeFormComponent';
import OptionsComponent from '../authorized/OptionsComponent';
import CancelPremium from '../authorized/CancelPremium';
import { Image } from 'react-bootstrap';
import Logo from '../../assets/executive-insight-logo.png'

export default function HeaderComponent() {

    const authContext = useAuth();
    const username = authContext.username();
    const isAuthenticated = authContext.isAuthenticated();
    const notifyRef = useRef(null);
    const addRef = useRef(null);
    const [showNotification, setShowNotification] = useState(false);
    const [showCodeForm, setShowCodeForm] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showCancelForm, setShowCancelForm] = useState(false);

    const handleShowNotification = () => {
        setShowNotification(!showNotification);
        setShowCodeForm(false);
        setShowOptions(false);
    }

    const handleShowCodeForm = () => {
        setShowCodeForm(!showCodeForm);
        setShowNotification(false);
        setShowOptions(false);
    }

    const handleShowOptions = () => {
        setShowOptions(true);
        setShowNotification(false);
        setShowCodeForm(false);
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

    const sendRequest = () => {
        setShowCodeForm(false);
        toast.success("Request sent")
    }

    return (
        <div>
            <Toaster />
            {showCodeForm && <CodeFormComponent addRef={addRef} setShowCodeForm={setShowCodeForm} sendRequest={sendRequest} />}
            {showOptions && <OptionsComponent setShowOptions={setShowOptions} setShowCancelForm={setShowCancelForm} />}
            <header className='border-bottom border-5 p-2' style={{ backgroundColor: "#b4b4b4" }}>
                <div className='container'>
                    <div className='row'>
                        <nav className='navbar navbar-expand-lg'>
                            <a className='navbar-brand' href="/home"><Image src={Logo} alt='logo' style={{width: "300px", height: "60px"}} /></a>
                            <div className='collapse navbar-collapse'>
                                <ul className='navbar-nav'>
                                </ul>
                            </div>
                            <ul className='navbar-nav'>
                                <li className='nav-item'>
                                    {!isAuthenticated && <Link className='nav-link' style={{ color: "white", marginRight: "20px" }} to="/login">Sign in</Link>}
                                </li>
                                <li className='nav-item'>
                                    {!isAuthenticated && <Link className='nav-link' style={{ color: "white", border: "solid 1px" }} to="/plan">Sign up</Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link mx-2' style={{ color: "white" }} onClick={handleShowCodeForm} ref={addRef} ><FontAwesomeIcon icon={faPlus} /></Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link mx-2' style={{ color: "white" }} onClick={handleShowNotification} ref={notifyRef}><FontAwesomeIcon icon={faBell} /></Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && <Link className='nav-link mx-2' style={{ color: "white" }} onClick={handleShowOptions}><FontAwesomeIcon icon={faBars} /></Link>}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            {showCancelForm && <CancelPremium setShowCancelForm={setShowCancelForm} />}
            {showNotification && <NotificationComponent notifyRef={notifyRef} setShowNotification={setShowNotification} handleAccept={handleAccept} handleReject={handleReject} />}
            </div>
    )
}