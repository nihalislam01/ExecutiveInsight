import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinWorkspaceApi, retrieveNotificationByUserApi, updateNotificationApi } from './api/ExecutiveInsightApiService';
import { useAuth } from './security/AuthContext';

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

    function handleReject(id, name) {
        var message =  `You have rejected the invitation to join ${name}`
        const notification = {
            notificationId: id,
            description: message
        }
        updateNotificationApi(notification)
            .then((response) => window.location.href = "/notification")
            .catch((error) => navigate('/error'))
    }

    function handleAccept(id, code, name) {
        var message = `You have successfully joined ${name}`
        const notification = {
            notificationId: id,
            description: message
        }
        joinWorkspaceApi(code, username)
            .catch((error) => navigate('/error'))
        updateNotificationApi(notification)
            .then((response) => window.location.href = "/notification")
            .catch((error) => navigate('/error'))
    }


    return (
        <div className="NotificationComponent">
            <div className='container'>
                {!hasNotifications && <p>No notifications yet</p>}
                {hasNotifications && <p>Notifications</p>}
                <table className='table'>
                    <tbody>
                        {
                            hasNotifications &&
                                notifications.map(
                                    notification => (
                                        <tr key={notification.notificationId}>
                                            <td className='form-control bg-light mb-3'>
                                                <div className="row pt-3 pb-3">
                                                    <div className='text-start col-md-6'>
                                                        <div>{notification.description}</div>
                                                        <div style={{"fontSize": "12px"}}>{notification.time}</div>
                                                    </div>
                                                {notification.invitation &&
                                                    <div className='text-end col-md-6'>
                                                        <button className='btn btn-outline-secondary mx-2 px-4' onClick={() => handleReject(notification.notificationId, notification.workspace.name)}>Reject</button>
                                                        <button className='btn btn-outline-primary px-4' onClick={() => handleAccept(notification.notificationId, notification.workspace.code, notification.workspace.name)}>Accept</button>
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