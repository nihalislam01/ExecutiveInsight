import { useEffect, useRef, useState } from "react";
import { addCustomPostApi } from "../api/ExecutiveInsightApiService";

export default function AddPostComponent({ setShow, id }) {

    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('success');
    const [message, setMessage] = useState('');
    const [postTitle, setPostTitle] = useState('');
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

    function handleTitleChange(event) {
        setPostTitle(event.target.value);
    }

    function setNotShow() {
        setShow(false);
        setShowAlert(false);
    }

    function addPost() {
        const post = {
            workspaceId: id,
            title: postTitle
        }
        addCustomPostApi(post)
            .then((response) => {
                window.location.href = `/posts/${id}`;
            })
            .catch((error) => {
                setAlertColor('danger');
                setMessage(error.response.data);
                setShowAlert(true)
            })
    }

    return (
        <div className='row justify-content-center position-relative' ref={formRef}>
            <div className='col-md-6 position-fixed z-1'>
                {showAlert && <div className={`alert alert-${alertColor} shadow`}>{message}</div>}
                <div className="card shadow">
                    <div className="card-header text-center p-3">
                        <h5>Add custom post into your workspace</h5>
                    </div>
                    <div className="card-body text-start">
                        <form>
                            <div className="form-group">
                                <label className="col-form-label m-0">Post Title</label>
                                <input type="text" className="form-control" value={postTitle} onChange={handleTitleChange} />
                            </div>
                        </form>
                        <hr />
                        <div className="text-end">
                            <button type="button" className="btn btn-secondary mx-2" onClick={setNotShow}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={addPost}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}