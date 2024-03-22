import { useEffect, useRef, useState } from "react";
import { createTeamApi } from "../api/ExecutiveInsightApiService";

export default function CreateTeamComponent(props) {

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('success');
    const [showAlert, setShowAlert] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
              props.setShow(false);
            }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [])

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function setNotShow() {
        setShowAlert(false);
        props.setShow(false);
        setName('');
    }

    function addTeam() {
        const team = {
            name: name,
            code: props.workspaceCode,
            email: props.email
        }
        createTeamApi(team)
            .then((response) => window.location.href = `/teams/${props.id}`)
            .catch((error) => {
                setAlertColor('danger');
                setMessage(error.response.data);
                setShowAlert(true)
            })
    }

    return (
        <div className='row justify-content-center position-relative' ref={formRef}>
            <div className='col-md-6 position-absolute'>
                {showAlert && <div className={`alert alert-${alertColor} shadow`}>{message}</div>}
                <div className="card shadow">
                    <div className="card-header text-center p-3">
                        <h5>Add Team</h5>
                    </div>
                    <div className="card-body text-start">
                        <form>
                            <div className="form-group">
                                <label className="col-form-label">Team Name</label>
                                <input type="text" className="form-control" value={name} onChange={handleNameChange} />
                            </div>
                        </form>
                        <hr />
                        <div className="text-end">
                            <button type="button" className="btn btn-secondary mx-2" onClick={setNotShow}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={addTeam}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}