import { useState } from "react";
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { retrieveWorkspaceByIdApi } from "../api/ExecutiveInsightApiService";
import { useAuth } from "../security/AuthContext"
import AddPostComponent from "./AddPostComponent";
import PostComponent from "./PostComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
                    <h2 className="mx-3 text-start">Posts</h2>
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
                            <tr>
                                <td>
                                    <button className="btn form-control py-2" onClick={showForm} style={{ backgroundColor: "#e9ecef" }}><FontAwesomeIcon icon={faPlus} /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}