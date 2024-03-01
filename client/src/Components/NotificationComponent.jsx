import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinWorkspaceApi, retrieveUserApi, retrieveWorkspaceByCodeApi, updateNotificationApi } from './api/ExecutiveInsightApiService';
import { useAuth } from './security/AuthContext';

export default function NotificationComponent() {

    const [notifications, setNotifications] = useState(null);
    const [hasNotifications, setHasNotifications] = useState(false)
    const [workspaceName, setWorkspaceName] = useState('')
    var staticWorkspaceCode = ''
    var isInvited = false;
    const authContext = useAuth();
    const username = authContext.username();
    const navigate = useNavigate();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh()
        retrieveUserApi(username)
            .then((response) => {
                handleResponse(response)
            })
            .catch((error) => navigate('/error'))
    }

    function handleResponse(response) {
        setNotifications(response.data.notifications)
        setHasNotifications(response.data.notifications.length > 0)
    }
    function setNotification(description) {
        if (description.length===6) {
            isInvited = true;
            staticWorkspaceCode = description
            retrieveWorkspaceByCodeApi(description)
            .then((response) => {
                setWorkspaceName(response.data.name)
            })
            .catch((error) => navigate('/error'))
            return `You have been invited to the workspace ${workspaceName}`
        } else {
            return description
        }
    }

    function handleReject(id) {
        var message =  `You have rejected the invitation to join ${workspaceName}`
        const notification = {
            notificationId: id,
            description: message
        }
        updateNotificationApi(notification)
            .then((response) => window.location.href = "/notification")
            .catch((error) => navigate('/error'))
    }

    function handleAccept(id) {
        var message = `You have successfully joined ${workspaceName}`
        const notification = {
            notificationId: id,
            description: message
        }
        joinWorkspaceApi(staticWorkspaceCode, username)
            .then((response) => console.log(response))
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
                                            <td>
                                                <div className="text-start pt-3 pb-3">{setNotification(notification.description)}</div>
                                            </td>
                                            {isInvited &&
                                                <td>
                                                    <button className='btn btn-outline-secondary mx-2 px-4' onClick={() => handleReject(notification.notificationId)}>Reject</button>
                                                    <button className='btn btn-outline-primary px-4' onClick={() => handleAccept(notification.notificationId)}>Accept</button>
                                                </td>
                                            }
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