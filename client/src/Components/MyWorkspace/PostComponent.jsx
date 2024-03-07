import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deletePostApi, retrieveUsersByWorkspaceAndPostApi } from "../api/ExecutiveInsightApiService";
import { useAuth } from "../security/AuthContext";

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
        const colors = ["warning", "success", "primary", "secondary", "info"]
        return colors[id%5];
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

    return (
        <Dropdown show={isOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle className={`btn btn-${selectColor(post.postId)} form-control text-start`}>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">{post.title}</p>
                    <p className={`btn btn-${selectColor(post.postId)} m-0`} onClick={() => handleDelete(post.title)}><FontAwesomeIcon icon={faTrashCan} /></p>
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="form-control">
                {hasUsers &&
                    users.map(
                        user => (
                            <Dropdown.Item key={user.userId} className="text-start bg-light">{user.name}</Dropdown.Item>
                        )
                    )
                }
                {!hasUsers &&
                    <Dropdown.Item className="text-center">No employees yet</Dropdown.Item>
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}