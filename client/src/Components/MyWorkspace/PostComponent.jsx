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

    return (
        <Dropdown show={isOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle className={`btn form-control text-start border-0`} style={{ backgroundColor: `#${selectColor(post.postId)}`}}>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0">{post.title}</p>
                    <p className={`btn m-0`} style={{ backgroundColor: `#${selectColor(post.postId)}`}} onClick={() => handleDelete(post.title)}><FontAwesomeIcon icon={faTrashCan} /></p>
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
                    <Dropdown.Item className="text-center">No members yet</Dropdown.Item>
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}