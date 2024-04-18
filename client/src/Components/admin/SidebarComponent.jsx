import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCalendarDays, faChartLine, faClipboardUser, faFile, faGauge, faPeopleGroup, faTruckFast, faUsers } from '@fortawesome/free-solid-svg-icons';

import { retrieveUserApi } from "../../api/ExecutiveInsightApiService";
import { useAuth } from "../../security/AuthContext";

import '../../styles/SidebarComponent.css';

export default function SidebarComponent() {

    const authContext = useAuth();
    const navigate = useNavigate()
    const hasWorkspace = authContext.isAdmin();
    const username = authContext.username();
    const [workspaceId, setWorkspaceId] = useState(0);

    useEffect(() => {
        authContext.refresh();
        retrieveUserApi(username)
            .then((response) => {
                if (hasWorkspace) {
                    setWorkspaceId(response.data.workspace.workspaceId)
                }
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')})
    }, [authContext, username, navigate, hasWorkspace])

    return (
                <div className="border-end border-5 sidebar px-0 text-start">
                    <Link className="nav-link my-2 mx-2 link" to={`/dashboard/${workspaceId}`}><FontAwesomeIcon icon={faGauge} className="mx-2" />Dashboard</Link>
                    <hr className="my-0" />
                    <Link className="nav-link my-2 mx-2 link" to={`/teams/${workspaceId}`}><FontAwesomeIcon icon={faPeopleGroup} className="mx-2" />Teams</Link>
                    <Link className="nav-link mb-2 mx-2 link" to={`/members/${workspaceId}`}><FontAwesomeIcon icon={faUsers} className="mx-2" />Members</Link>
                    <Link className="nav-link mb-2 mx-2 link" to={`/posts/${workspaceId}`}><FontAwesomeIcon icon={faAddressCard} className="mx-2" />Member Posts</Link>
                    <hr className="my-0" />
                    <Link className="nav-link my-2 mx-2 link" to={`/sales/${workspaceId}`}><FontAwesomeIcon icon={faChartLine} className="mx-2" />Sales</Link>
                    <Link className="nav-link mb-2 mx-2 link" to={`/products/${workspaceId}`}><FontAwesomeIcon icon={faFile} className="mx-2" />Products</Link>
                    <Link className="nav-link mb-2 mx-2 link" to={`/tasks/${workspaceId}`}><FontAwesomeIcon icon={faTruckFast} className="mx-2" />Task Allocation</Link>
                    <hr className="my-0" />
                    <Link className="nav-link my-2 mx-2 link" to={`/attendance/${workspaceId}`}><FontAwesomeIcon icon={faClipboardUser} className="mx-2" />Attendance</Link>
                    <Link className="nav-link mb-2 mx-2 link" to={`/google-calendar/${workspaceId}`}><FontAwesomeIcon icon={faCalendarDays} className="mx-2" />Calender</Link>
                </div>
    )
}