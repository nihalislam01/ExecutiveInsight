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
            <div className='d-flex justify-content-center position-fixed z-1' style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} ref={formRef}>
                <div style={{width: "600px"}}>
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
                                <button type="button" className="button-06 mx-2" onClick={setNotShow}>Close</button>
                                <button type="button" className="button-08 px-3" onClick={addPost}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}