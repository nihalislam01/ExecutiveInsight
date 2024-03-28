import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
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
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => refreshPage(), [])

  function refreshPage() {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowPopover(false);
        setShowPosts(false);
        setShowTeams(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  function viewProfile() {
    navigate(`/user/${userJoinWorkspace.user.userId}`)
  }

  return (
    <div>
      <div className='d-flex justify-content-between'>
          <button className="btn btn-light form-control d-flex justify-content-between align-items-center px-4" style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }} onClick={viewProfile}>
              <div>
                  <p style={{fontSize: "25px"}} className="p-0 m-0 text-start">{userJoinWorkspace.user.name}</p>
                  {userJoinWorkspace.post!=null &&
                      <p style={{fontSize: "15px"}} className="p-0 m-0 text-start">{userJoinWorkspace.post.title}</p>
                  }
              </div>
          </button>
          <button className="m-0 btn btn-light" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }} ref={target} onClick={handleClick}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
        </div>
        <Overlay target={target.current} show={showPopover} placement="bottom" ref={formRef}>
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