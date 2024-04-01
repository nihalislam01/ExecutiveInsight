import { useEffect, useRef, useState } from "react";

import { addCustomPostApi } from "../../../api/ExecutiveInsightApiService";
import toast, { Toaster } from "react-hot-toast";

export default function PostFormComponent(props) {

    const [postTitle, setPostTitle] = useState('');
    
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

    const handleTitleChange = (event) => {
        setPostTitle(event.target.value);
    }

    const setNotShow = () => {
        props.setShow(false);
    }

    const addPost = async () => {
        if (postTitle.trim() === '') {
            toast("Please add a post title")
        } else {
            const post = {
                workspaceId: props.id,
                title: postTitle
            }
            await addCustomPostApi(post)
                .then((response) => {
                    setNotShow();
                    toast.success("Post successfully added");
                })
                .catch((error) => {
                    console.log("Error creating post: " + error)
                    toast.error(error.response.data)
                })
        }
    }

    return (
        <div>
            <Toaster />
            <div className='row justify-content-center position-relative' ref={formRef}>
                <div className='col-md-6 position-fixed z-1'>
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
        </div>
    )
}