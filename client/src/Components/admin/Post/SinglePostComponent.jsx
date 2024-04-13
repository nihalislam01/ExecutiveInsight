import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { faTrashCan, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deletePostApi, retrieveUsersByWorkspaceAndPostApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

import '../../../styles/PostComponent.css';
import profileImage from '../../../assets/executive-insight-blank-user.png';
import { Image } from "react-bootstrap";

export default function SinglePostComponent({ post, id }) {

    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState([{}]);
    const [hasUsers, setHasUsers] = useState(false);

    const navigate = useNavigate();
    const authContext = useAuth();

    useEffect(() => {
        authContext.refresh();

        const getUsers = async () => {
            await retrieveUsersByWorkspaceAndPostApi(id, post.postId)
                .then((response) => {
                    setUsers(response.data);
                    setHasUsers(response.data.length > 0);
                })
                .catch((error) => {
                    console.log("Error fetching users: " + error)
                    navigate('/error')
                })
        }

        getUsers();
        
    }, [authContext, id, post.postId, navigate])

    const selectColor = (id) => {
        const customColors = ["3a5a40", "7f5539", "588157", "30638e", "3c6e71", "ad2831", "495057", "b5838d", "6a4c93", "ee6c4d"];
        return customColors[id%10];
    }

    const handleDelete = async (title) => {
        await deletePostApi(id, title)
            .then((response) => toast.success("Post successfully deleted"))
            .catch((error) => {
                console.log("Error deleting post: " + error)
                toast.error("Something went wrong")
            })
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const viewProfile = (id) => {
        navigate(`/user/${id}`)
    }

    return (
        <div className="PostComponent">
            <Toaster />
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex px-4 py-3 post-button w-100" style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0", backgroundColor: `#${selectColor(post.postId)}` }} onClick={toggleDropdown}>
                    <p className="m-0"><FontAwesomeIcon icon={faCaretDown} /></p>
                    <p className="my-0 mx-2">{post.title}</p>
                </div>
                <div className="m-0 post-button px-4 py-3" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", backgroundColor: `#${selectColor(post.postId)}` }} onClick={() => handleDelete(post.title)}><FontAwesomeIcon icon={faTrashCan} /></div>
            </div>
            <div className={`shadow members-list bg-light post-hidden ${isOpen ? "post-show" : ""}`}>
                {hasUsers &&
                    users.map(
                        user => (
                            <div key={user.userId} className="d-flex align-items-center p-2 m-2 user" onClick={() => viewProfile(user.userId)}>
                                <div className="d-flex" style={{width: "25%"}} >
                                    {user.image===null && <Image src={profileImage} alt="Profile" roundedCircle style={{ width: '30px', height: '30px' }} className='mx-2' />}
                                    {user.image!==null && <Image src={`data:image/png;base64,${user.image}`} alt="Profile" roundedCircle style={{ width: '30px', height: '30px' }} className='mx-2' />}
                                    <p className="m-0">{user.name}</p>
                                </div>
                                <div style={{width: "45%"}}>
                                    <div style={{ width: '100%', height: '5px', backgroundColor: '#ced4da', position: 'relative', borderRadius: "5px" }}>
                                        <div style={{ width: `${(100*user.badge.points)/user.badge.pointLimit}%`, height: '100%', backgroundColor: '#8da9c4', transition: 'width 0.5s ease-in-out', borderRadius: "5px" }} ></div>
                                    </div>
                                </div>
                                <div className='mx-4'><p className='m-0'>level {user.badge.badgeLevel}</p></div>
                            </div>
                        )
                    )
                }
                {!hasUsers &&
                    <div className="text-center p-3">No members yet</div>
                }
            </div>
        </div>
    )
}