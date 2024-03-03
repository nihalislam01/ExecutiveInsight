import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addCustomPostApi, deletePostApi, retrieveWorkspaceByIdApi } from "../api/ExecutiveInsightApiService";
import { useAuth } from "../security/AuthContext"

export default function PostComponent() {

    const [posts, setPosts] = useState([{}]);
    const [hasPosts, setHasPosts] = useState(false);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('success');
    const [message, setMessage] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const authContext = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh()
        retrieveWorkspaceByIdApi(id)
            .then((response) => {
                setPosts(response.data.posts);
                setHasPosts(response.data.posts.length > 0);
            })
            .catch((error) => navigate('/error'))
    }

    function selectColor(id) {
        const colors = ["warning", "success", "primary", "secondary", "info"]
        return colors[id%5];
    }

    function showForm() {
        setShow(true);
    }

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

    function handleDelete(title) {
        deletePostApi(id, title)
            .then((response) => {
                console.log(response)
                window.location.href = `/posts/${id}`
        })
            .catch((error) => {
                console.log(error)
                navigate('/error')
        })
    }

    return (
        <div className="PostComponent">
            {show &&
                <div className='row justify-content-center position-relative'>
                    <div className='col-md-6 position-absolute'>
                        {showAlert && <div className={`alert alert-${alertColor} shadow`}>{message}</div>}
                        <div className="card shadow">
                            <div className="card-header text-center p-3">
                                <h5>Add custom post into your workspace</h5>
                            </div>
                            <div className="card-body text-start">
                                <form>
                                    <div className="form-group">
                                        <label className="col-form-label">Post Title</label>
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
            }
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-10">
                    <div className="d-flex justify-content-between mb-4">
                        <h2 className="px-5">Posts</h2>
                        <button className="btn btn-outline-primary px-4 mx-5" onClick={showForm}>Add Post</button>
                    </div>
                    <table className='table'>
                        <tbody>
                            {hasPosts &&
                                posts.map(
                                    post => (
                                        <tr key={post.postId}>
                                            <td>
                                                <button className={`btn btn-${selectColor(post.postId)} form-control d-flex justify-content-between align-items-center`}>
                                                    <p>{post.title}</p>
                                                    <p className={`btn btn-${selectColor(post.postId)}`} onClick={() => handleDelete(post.title)}><FontAwesomeIcon icon={faTrashCan} /></p>
                                                </button>
                                            </td>
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