import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { retrieveWorkspaceByIdApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

import PostFormComponent from "./PostFormComponent";
import SinglePostComponent from "./SinglePostComponent";

import '../../../styles/ListComponent.css';

export default function ListPostComponent() {

    const [posts, setPosts] = useState([{}]);
    const [hasPosts, setHasPosts] = useState(false);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([{}]);

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
                        setFilteredPosts(response.data.posts)
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


    const handleSearch = (event) => {
        const term = event.target.value;
        setSearch(term);
        const filtered = posts.filter(post =>
          post.title.toLowerCase().includes(term.toLowerCase())
        );
        setHasPosts(filtered.length > 0);
        setFilteredPosts(filtered);
    }

    return (
        <div className="container w-100 mt-4">
            {show &&
                <PostFormComponent setShow={setShow} id={id} />
            }
            <div className="d-flex">
                <h2 className="mx-3 text-start">Posts</h2>
                <input placeholder="&#xf002; Search Post" value={search} style={{ fontFamily: 'Arial, FontAwesome', marginLeft: "200px", backgroundColor: "#f8f9fa" }} className="form-control w-50 text-center" onChange={handleSearch} />
            </div>
            <hr />
            <table className='table'>
                <tbody>
                    <tr>
                        <td>
                            <div className="w-100 py-2 create text-center" onClick={showForm}><FontAwesomeIcon icon={faPlus} /></div>
                        </td>
                    </tr>
                    {hasPosts &&
                        filteredPosts.map(
                            post => (
                                <tr key={post.postId}>
                                    <td>
                                        <SinglePostComponent post={post} id={id} />
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}