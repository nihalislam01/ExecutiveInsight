import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { requestJoinApi } from './api/ExecutiveInsightApiService';
import { useAuth } from './security/AuthContext';

export default function CodeFormComponent({ setShowCodeForm }) {

    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('success');
    const [showAlert, setAlert] = useState(false);
    const authContext = useAuth();
    const username = authContext.username();
    const formRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
              setShowCodeForm(false);
            }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [])

    function handleSubmit() {
        const userJoinWorkspace = {
            email: username,
            code: code
        }
        requestJoinApi(userJoinWorkspace)
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
            })
    }

    function handleCodeChange(event) {
        setCode(event.target.value);
    }

    return (
        <div className='row justify-content-center position-relative' ref={formRef}>
            <div className='col-md-6 position-absolute z-2' style={{ top: "150px" }}>
                {showAlert && <div className={`alert alert-${alertColor}`}>{message}</div>}
                <div className="card shadow">
                    <div className="card-header">Enter workspace code</div>
                    <div className="card-body">
                        <div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="code" value={code} onChange={handleCodeChange} required />
                            </div>
                            <button type="button" className="btn btn-success form-control" onClick={handleSubmit}>Join Workspace</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}