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
                <div className="col-md-2 border-end border-5 border-light sidebar">
                    <table className="table table-hover">
                        <tbody>
                            <tr><td><Link className="nav-link" to="/my-workspace">Main Dashboard</Link></td></tr>
                            <tr><td><Link className="nav-link" to="/my-workspace">Teams</Link></td></tr>
                            <tr><td><Link className="nav-link" to={`/employees/${workspaceId}`}>Employees</Link></td></tr>
                            <tr><td><Link className="nav-link" to="/my-workspace">Products</Link></td></tr>
                            <tr><td><Link className="nav-link" to="/my-workspace">Sales</Link></td></tr>
                            <tr><td><Link className="nav-link" to="/my-workspace">Orders</Link></td></tr>
                            <tr><td><Link className="nav-link" to="/my-workspace">Calender</Link></td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-10">
                </div>
            </div>
            }
        </div>
    )
}