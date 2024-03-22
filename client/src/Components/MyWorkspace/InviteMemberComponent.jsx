import { useEffect, useRef, useState } from "react";
import { inviteJoinApi } from "../api/ExecutiveInsightApiService";

export default function InviteMemberComponent({ workspaceCode, setShow }) {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('success');
    const [showAlert, setAlert] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
              setShow(false);
            }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [])

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function setNotShow() {
        setAlert(false);
        setShow(false);
        setEmail('');
    }

    function sendInvite() {
        const userJoinWorkspace = {
            email: email,
            code: workspaceCode
        }
        inviteJoinApi(userJoinWorkspace)
            .then((response) => {
                if (response.status===200) {
                    setAlertColor('success');
                    setMessage(response.data);
                    setAlert(true);
                } else {
                    setAlertColor('warning')
                    setMessage(response.data);
                    setAlert(true);
                }
            })
            .catch((error) => {
                setAlertColor('danger')
                setMessage(error.response.data);
                setAlert(true);
            });
    }

    return (
        <div className='row justify-content-center position-relative' ref={formRef}>
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
    )
}