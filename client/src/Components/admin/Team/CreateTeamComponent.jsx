import { useEffect, useRef, useState } from "react";

import { createTeamApi } from "../../../api/ExecutiveInsightApiService";
import toast, { Toaster } from "react-hot-toast";

export default function CreateTeamComponent(props) {

    const [name, setName] = useState('');

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
    }, [props])

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const setNotShow = () => {
        props.setShow(false);
        setName('');
    }

    const addTeam = () => {
        const team = {
            name: name,
            code: props.workspaceCode,
            email: props.email
        }
        createTeamApi(team)
            .then((response) => props.setSuccess("Team added"))
            .catch((error) => toast.error(error.response.data))
    }

    return (
        <div>
            <Toaster />
            <div className='d-flex justify-content-center position-fixed z-1' style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} ref={formRef}>
                <div style={{width: "600px"}}>
                    <div className="card shadow">
                        <div className="card-header text-center p-3">
                            <h5>Add Team</h5>
                        </div>
                        <div className="card-body text-start">
                            <form>
                                <div className="form-group">
                                    <label className="col-form-label m-0">Team Name</label>
                                    <input type="text" className="form-control" value={name} onChange={handleNameChange} />
                                </div>
                            </form>
                            <hr />
                            <div className="text-end">
                                <button className="button-06 mx-2" onClick={setNotShow}>Close</button>
                                <button className="button-08 px-3" onClick={addTeam}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}