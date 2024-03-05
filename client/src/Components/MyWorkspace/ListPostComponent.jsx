import { useState } from "react";
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { retrieveWorkspaceByIdApi } from "../api/ExecutiveInsightApiService";
import { useAuth } from "../security/AuthContext"
import AddPostComponent from "./AddPostComponent";
import PostComponent from "./PostComponent";

export default function ListPostComponent() {

    const [posts, setPosts] = useState([{}]);
    const [hasPosts, setHasPosts] = useState(false);
    const [show, setShow] = useState(false);

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

    function showForm() {
        setShow(true);
    }

    return (
        <div className="PostComponent">
            {show &&
                <AddPostComponent setShow={setShow} id={id} />
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
                                                <PostComponent post={post} id={id} />
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