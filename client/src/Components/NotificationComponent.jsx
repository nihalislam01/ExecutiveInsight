import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinWorkspaceApi, retrieveNotificationByUserApi, updateNotificationApi } from './api/ExecutiveInsightApiService';
import { useAuth } from './security/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import './styles/NotificationComponent.css'

export default function NotificationComponent() {

    const [notifications, setNotifications] = useState(null);
    const [hasNotifications, setHasNotifications] = useState(false)
    const authContext = useAuth();
    const username = authContext.username();
    const navigate = useNavigate();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh()
        retrieveNotificationByUserApi(username)
            .then((response) => {
                handleResponse(response)
            })
            .catch((error) => navigate('/error'))
    }

    function handleResponse(response) {
        setNotifications(response.data)
        setHasNotifications(response.data.length > 0)
    }

    function handleReject(id, email) {
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
                window.location.href = '/home';
        })
            .catch((error) => navigate('/error'))
    }

    function handleAccept(id, code, email) {
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
            .catch((error) => navigate('/error'))
        updateNotificationApi(notification)
            .then((response) => {
                window.location.href = '/home';
        })
            .catch((error) => navigate('/error'))
    }


    return (
        <div className='row justify-content-end position-relative pt-0 mt-0'>
            <div className='col-md-4 position-absolute shadow z-2 border border-2 notification-container'>
                {!hasNotifications && <h5 className='text-start my-4'>No notifications yet</h5>}
                {hasNotifications && <h5 className='text-start my-4'>Notifications</h5>}
                <hr className='mt-0' />
                <table className='table'>
                    <tbody>
                        {
                            hasNotifications &&
                                notifications.map(
                                    notification => (
                                        <tr key={notification.notificationId}>
                                            <td className='form-control mb-3' style={{ backgroundColor: "#f2f2f2" }}>
                                                <div className="row">
                                                {!notification.invitation &&
                                                    <div className='text-start col-md-12'>
                                                        <div>{notification.description}</div>
                                                        <div className='date'>{notification.time}</div>
                                                    </div>
                                                }
                                                {notification.invitation &&
                                                    <div className='text-start col-md-9'>
                                                        <div>{notification.description}</div>
                                                        <div className='date'>{notification.time}</div>
                                                    </div>
                                                }
                                                {notification.invitation &&
                                                    <div className='text-end col-md-3'>
                                                        <button className='btn' onClick={() => handleReject(notification.notificationId, notification.userEmail )}><FontAwesomeIcon icon={faXmark} /></button>
                                                        <button className='btn' onClick={() => handleAccept(notification.notificationId, notification.workspaceCode, notification.userEmail)}><FontAwesomeIcon icon={faCheck} /></button>
                                                    </div>
                                                }
                                                </div>                                                      
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                    </tbody>
                </table>
            </div>
        </div>
    )
}