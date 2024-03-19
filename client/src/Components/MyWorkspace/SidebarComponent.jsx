import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCalendarDays, faChartLine, faFile, faGauge, faPeopleGroup, faTruckFast, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { retrieveUserApi } from "../api/ExecutiveInsightApiService";
import { useAuth } from "../security/AuthContext";
import '../styles/SidebarComponent.css'

export default function SidebarComponent() {

    const authContext = useAuth();
    const navigate = useNavigate()
    const hasWorkspace = authContext.hasWorkspace();
    const username = authContext.username();
    const [workspaceId, setWorkspaceId] = useState(0);

    useEffect(() => refreshPage(), [])

    function refreshPage() {
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
    }

    return (
        <div className="SidebarComponent">

            {hasWorkspace && 
            <div className="row container">
                <div className="col-md-2 border-end border-5 border-light sidebar px-0 text-start" style={{ overflow: "auto" }}>
                    <Link className="nav-link my-2 mx-2 link" to="/my-workspace"><FontAwesomeIcon icon={faGauge} className="mx-2" />Dashboard</Link>
                    <hr className="my-0" />
                    <Link className="nav-link my-2 mx-2 link" to={`/teams/${workspaceId}`}><FontAwesomeIcon icon={faPeopleGroup} className="mx-2" />Teams</Link>
                    <Link className="nav-link mb-2 mx-2 link" to={`/members/${workspaceId}`}><FontAwesomeIcon icon={faUsers} className="mx-2" />Members</Link>
                    <Link className="nav-link mb-2 mx-2 link" to={`/posts/${workspaceId}`}><FontAwesomeIcon icon={faAddressCard} className="mx-2" />Member Posts</Link>
                    <hr className="my-0" />
                    <Link className="nav-link mb-2 mx-2 link" to="/my-workspace"><FontAwesomeIcon icon={faChartLine} className="mx-2" />Sales</Link>
                    <Link className="nav-link mb-2 mx-2 link" to="/my-workspace"><FontAwesomeIcon icon={faTruckFast} className="mx-2" />Orders</Link>
                    <Link className="nav-link my-2 mx-2 link" to="/my-workspace"><FontAwesomeIcon icon={faFile} className="mx-2" />Products</Link>
                    <hr className="my-0" />
                    <Link className="nav-link my-2 mx-2 link" to="/my-workspace"><FontAwesomeIcon icon={faCalendarDays} className="mx-2" />Calender</Link>
                </div>
                <div className="col-md-10">
                </div>
            </div>
            }
        </div>
    )
}