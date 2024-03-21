import { faTrashCan, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePostApi, retrieveUsersByWorkspaceAndPostApi } from "../api/ExecutiveInsightApiService";
import { useAuth } from "../security/AuthContext";
import '../styles/PostComponent.css';

export default function PostComponent({ post, id }) {

    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState([{}]);
    const [hasUsers, setHasUsers] = useState(false);

    const navigate = useNavigate();
    const authContext = useAuth();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh();
        retrieveUsersByWorkspaceAndPostApi(id, post.postId)
            .then((response) => {
                setUsers(response.data);
                setHasUsers(response.data.length > 0);
            })
            .catch((error) => navigate('/error'))
    }

    function selectColor(id) {
        const customColors = ["3a5a40", "7f5539", "588157", "30638e", "3c6e71", "ad2831", "495057", "b5838d", "6a4c93", "ee6c4d"];
        return customColors[id%10];
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

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function viewProfile(id) {
        navigate(`/user/${id}`)
    }

    return (
        <div className="PostComponent">
            <div className="d-flex justify-content-between align-items-center p-3 post-button" style={{backgroundColor: `#${selectColor(post.postId)}`}} onClick={toggleDropdown}>
                <div className="d-flex">
                    <p className="m-0"><FontAwesomeIcon icon={faCaretDown} /></p>
                    <p className="my-0 mx-2">{post.title}</p>
                </div>
                <p className="m-0" onClick={() => handleDelete(post.title)}><FontAwesomeIcon icon={faTrashCan} /></p>
            </div>
            {isOpen &&
                <div className="border border-2 shadow members-list bg-light">
                    {hasUsers &&
                        users.map(
                            user => (
                                <div key={user.userId} className="text-start p-2 m-2 user" onClick={() => viewProfile(user.userId)}>
                                    {user.name}
                                </div>
                            )
                        )
                    }
                    {!hasUsers &&
                        <div className="text-center p-3">No members yet</div>
                    }
                </div>
            }
        </div>
    )
}