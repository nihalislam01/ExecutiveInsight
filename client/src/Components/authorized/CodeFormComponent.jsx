import { useEffect, useState, useRef } from 'react';
import { requestJoinApi } from '../../api/ExecutiveInsightApiService';
import { useAuth } from '../../security/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export default function CodeFormComponent({ addRef, setShowCodeForm, sendRequest }) {

    const [code, setCode] = useState('');
    const authContext = useAuth();
    const username = authContext.username();
    const formRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target) && addRef.current && !addRef.current.contains(event.target)) {
              setShowCodeForm(false);
            }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [setShowCodeForm, addRef])

    const handleSubmit = async () => {
        const userJoinWorkspace = {
            email: username,
            code: code
        }
        await requestJoinApi(userJoinWorkspace)
            .then((response) => {
                if (response.status===200) {
                    sendRequest();
                } else {
                    toast.error(response.data)
                }
            })
            .catch((error) => {
                toast.error(error.response.data)
            })
    }

    function handleCodeChange(event) {
        setCode(event.target.value);
    }

    return (
        <div>
            <Toaster />
            <div className='row justify-content-center position-relative' ref={formRef}>
                <div className='col-md-6 position-absolute z-2' style={{ top: "150px" }}>
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
        </div>
    )
}