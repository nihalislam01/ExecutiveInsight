import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { retrieveUsersByWorkspaceIdApi, retrieveWorkspaceByIdApi, sendInviteApi } from "../api/ExecutiveInsightApiService";

export default function EmployeesComponent() {


    const [users, setUsers] = useState([{}]);
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('success');
    const [showAlert, setShowAlert] = useState(false);
    const [workspaceCode, setWorkspaceCode] = useState('');
    const [hasUsers, setHasUsers] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        retrieveUsersByWorkspaceIdApi(id)
            .then((response) => {
                setUsers(response.data)
                setHasUsers(response.data.length > 0)
            })
            .catch((error) => navigate('/error'))
        retrieveWorkspaceByIdApi(id)
            .then((response) => {
                setWorkspaceCode(response.data.code)
            })
            .catch((error) => navigate('/error'))
    }

    function setShowForm() {
        setShow(true);
    }

    function setNotShow() {
        setShow(false);
    }

    function sendInvite() {
        setShowAlert(true);
        sendInviteApi(email, workspaceCode)
            .then((response) => handleResponse(response))
            .catch((error) => handleResponse(error));
    }

    function handleResponse(response) {
        if (response.status===200) {
            setAlertColor('success')
            setMessage(response.data)
        } else if (response.response.status===404) {
            setAlertColor('danger')
            setMessage(response.response.data)
        } else {
            setAlertColor('warning')
            setMessage(response.response.data)
        }
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    return (
        <div className="EmployeesComponent">
            {show &&
                <div className='row justify-content-center position-relative'>
                    <div className='col-md-6 position-absolute'>
                        {showAlert && <div className={`alert alert-${alertColor} shadow`}>{message}</div>}
                        <div className="card shadow">
                            <div className="card-header text-center p-3">
                                <h5>Invite employee into your workspace</h5>
                            </div>
                            <div className="card-body text-start">
                                <form>
                                    <div className="form-group">
                                        <label className="col-form-label">Email</label>
                                        <input type="email" className="form-control" value={email} onChange={handleEmailChange} />
                                    </div>
                                </form>
                                <hr />
                                <div className="form-group">
                                    <label className="col-form-label">OR, SEND THE WORKSPACE CODE TO YOUR EMPLOYEE</label>
                                    <div className="form-control text-start bg-light">{workspaceCode}</div>
                                </div>
                                <hr />
                                <div className="text-end">
                                    <button type="button" className="btn btn-secondary mx-2" onClick={setNotShow}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={sendInvite}>Send Invite</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-10 text-end">
                    <button type="button" className="btn btn-outline-success text-end mx-5 px-4" onClick={setShowForm}>Invite</button>
                    <table className="table text-start">
                        <tbody> 
                            {hasUsers &&
                                users.map(
                                    user => (
                                        <tr key={user.userId}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}