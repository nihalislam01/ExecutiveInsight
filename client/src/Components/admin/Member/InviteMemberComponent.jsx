import { useEffect, useRef, useState } from "react";

import { inviteJoinApi } from "../../../api/ExecutiveInsightApiService";
import toast, { Toaster } from "react-hot-toast";

export default function InviteMemberComponent({ workspaceCode, setShow }) {

    const [email, setEmail] = useState('');

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
    }, [setShow])

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const setNotShow = () => {
        setShow(false);
        setEmail('');
    }

    const sendInvite = async () => {
        const userJoinWorkspace = {
            email: email,
            code: workspaceCode
        }
        await inviteJoinApi(userJoinWorkspace)
            .then((response) =>{
                setShow(false)
                toast.success("Invitation Sent")
            })
            .catch((error) =>toast.error(error.response.data))
    }

    return (
        <div>
            <Toaster />
            <div className='d-flex justify-content-center position-fixed z-1' style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} ref={formRef}>
                <div style={{width: "600px"}}>
                    <div className="card shadow">
                        <div className="card-header text-center p-3">
                            <h5>Invite member into your workspace</h5>
                        </div>
                        <div className="card-body text-start">
                            <form>
                                <div className="form-group">
                                    <label className="col-form-label m-0">Email</label>
                                    <input type="email" className="form-control" value={email} onChange={handleEmailChange} />
                                </div>
                            </form>
                            <hr />
                            <div className="form-group">
                                <label className="col-form-label m-0">OR, SEND THE WORKSPACE CODE TO YOUR EMPLOYEE</label>
                                <div className="form-control text-start bg-light">{workspaceCode}</div>
                            </div>
                            <hr />
                            <div className="text-end">
                                <button type="button" className="button-06 mx-2 px-4" onClick={setNotShow}>Close</button>
                                <button type="button" className="button-08" onClick={sendInvite}>Send Invite</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}