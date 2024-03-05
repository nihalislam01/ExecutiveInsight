import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { assignUserToPostApi } from '../api/ExecutiveInsightApiService';
import { useAuth } from '../security/AuthContext';


export default function EmployeeComponent({ userJoinWorkspace, hasPosts, posts, workspaceCode, id }) {
  const [showPopover, setShowPopover] = useState(false);
  const target = React.useRef(null);
  const navigate = useNavigate();
  const authContext = useAuth();

  useEffect(() => refreshPage(), [])

  function refreshPage() {
    authContext.refresh();
  }

  const handleClick = () => {
    setShowPopover(!showPopover);
  };

  const assignPost = (postId, email) => {
    authContext.refresh();
    assignUserToPostApi(email, workspaceCode, postId)
        .then((response) => {
            window.location.href = `/employees/${id}`;
        })
        .catch((error) => navigate('/error'))
}

  return (
    <div>
        <button className="btn btn-light form-control d-flex justify-content-between align-items-center px-4">
            <div>
                <p style={{fontSize: "25px"}} className="p-0 m-0 text-start">{userJoinWorkspace.user.name}</p>
                {userJoinWorkspace.post!=null &&
                    <p style={{fontSize: "15px"}} className="p-0 m-0 text-start">{userJoinWorkspace.post.title}</p>
                }
            </div>
            <div>
                <p className="m-0 btn btn-light" ref={target} onClick={handleClick}><FontAwesomeIcon icon={faEllipsisVertical} /></p>
            </div>
        </button>
        <Overlay target={target.current} show={showPopover} placement="bottom">
            <Popover id={userJoinWorkspace.userJoinWorkspaceId}>
                <Popover.Header as="h3">Assign User To A Post</Popover.Header>
                <Popover.Body className='m-0 p-0'>
                <table className="table text-center m-0 p-0">
                    <tbody>
                            {hasPosts &&
                                posts.map(
                                    post => (
                                        <tr key={post.postId}>
                                            <td className='m-0 p-0'><button className="btn btn-light form-control" onClick={() => assignPost(post.postId, userJoinWorkspace.user.email)}>{post.title}</button></td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </Popover.Body>
            </Popover>
        </Overlay>
    </div>
  );
}