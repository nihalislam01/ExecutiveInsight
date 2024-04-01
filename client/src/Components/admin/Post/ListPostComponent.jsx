import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { retrieveWorkspaceByIdApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

import PostFormComponent from "./PostFormComponent";
import PostComponent from "./PostComponent";

import '../../../styles/ListComponent.css';

export default function ListPostComponent() {

    const [posts, setPosts] = useState([{}]);
    const [hasPosts, setHasPosts] = useState(false);
    const [show, setShow] = useState(false);

    const authContext = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        authContext.refresh()
        const getWorkspace = async () => {
                await retrieveWorkspaceByIdApi(id)
                    .then((response) => {
                        setPosts(response.data.posts);
                        setHasPosts(response.data.posts.length > 0);
                    })
                    .catch((error) => {
                        console.log("Error fetching workspace: " + error)
                        navigate('/error')
                    })
        }
        getWorkspace();
    }, [authContext, id, navigate])

    const showForm = () => {
        setShow(true);
    }

    return (
        <div className="PostComponent">
            {show &&
                <PostFormComponent setShow={setShow} id={id} />
            }
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-10">
                    <h2 className="mx-3 text-start">Posts</h2>
                    <hr />
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="w-100 py-2 create text-center" onClick={showForm}><FontAwesomeIcon icon={faPlus} /></div>
                                </td>
                            </tr>
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