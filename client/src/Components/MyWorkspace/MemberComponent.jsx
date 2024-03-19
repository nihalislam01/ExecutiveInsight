import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';
import AssignMemberComponent from './AssignMemberComponent';

export default function MemberComponent({ userJoinWorkspace, hasPosts, posts, workspaceCode, id, hasTeams, teams }) {
  const [showPopover, setShowPopover] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const target = React.useRef(null);
  const postTarget = React.useRef(null);
  const teamTarget = React.useRef(null);
  const authContext = useAuth();

  useEffect(() => refreshPage(), [])

  function refreshPage() {
    authContext.refresh();
  }

  function handleClick() {
    setShowPopover(!showPopover);
    setShowPosts(false);
    setShowTeams(false);
  };

  function handleShowPost() {
    setShowPosts(!showPosts);
    setShowTeams(false);
  }

  function handleShowTeam() {
    setShowTeams(!showTeams);
    setShowPosts(false);
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
                <Popover.Body className='m-0 p-0'>
                    <button className="btn btn-light form-control" ref={postTarget} onClick={handleShowPost}>Assign User To a Post</button>
                    <button className="btn btn-light form-control" ref={teamTarget} onClick={handleShowTeam}>Assign User To a Team</button>
                </Popover.Body>
            </Popover>
        </Overlay>
        <AssignMemberComponent showPosts={showPosts} showTeams={showTeams} hasPosts={hasPosts} hasTeams={hasTeams} posts={posts} teams={teams} userJoinWorkspace={userJoinWorkspace} postTarget={postTarget} teamTarget={teamTarget} id={id} workspaceCode={workspaceCode} />
    </div>
  );
}