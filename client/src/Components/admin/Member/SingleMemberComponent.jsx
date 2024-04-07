import React, { useEffect, useRef, useState } from 'react';
import { Image, Overlay, Popover } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AssignMemberComponent from './AssignMemberComponent';

import profileImage from "../../../assets/executive-insight-blank-user.png";

export default function SingleMemberComponent({ userJoinWorkspace, hasPosts, posts, workspaceCode, id, hasTeams, teams, fillPercentage }) {

  const [showPopover, setShowPopover] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showTeams, setShowTeams] = useState(false);

  const target = useRef(null);
  const postTarget = useRef(null);
  const teamTarget = useRef(null);
  const formRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
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
  }, [])

  const handleClick = () => {
    setShowPopover(!showPopover);
    setShowPosts(false);
    setShowTeams(false);
  };

  const handleShowPost = () => {
    setShowPosts(!showPosts);
    setShowTeams(false);
  }

  const handleShowTeam = () => {
    setShowTeams(!showTeams);
    setShowPosts(false);
  }

  const viewProfile = () => {
    navigate(`/user/${userJoinWorkspace.user.userId}`)
  }

  return (
    <div>
      <div className='d-flex justify-content-between'>
          <button className="btn btn-light form-control d-flex justify-content-start align-items-center" style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }} onClick={viewProfile}>
            {userJoinWorkspace.user.image===null && <Image src={profileImage} alt="Profile" roundedCircle style={{ width: '40px', height: '40px' }} className='mx-2' />}
            {userJoinWorkspace.user.image!==null && <Image src={userJoinWorkspace.user.image} alt="Profile" roundedCircle style={{ width: '40px', height: '40px' }} className='mx-2' />}
              <div style={{width: "300px"}}>
                  <p style={{fontSize: "25px"}} className="p-0 m-0 text-start">{userJoinWorkspace.user.name}</p>
                  {userJoinWorkspace.post!=null &&
                      <p style={{fontSize: "15px"}} className="p-0 m-0 text-start">{userJoinWorkspace.post.title}</p>
                  }
              </div>
              <div style={{width: "600px"}}>
                <div style={{ width: '100%', height: '5px', backgroundColor: '#ced4da', position: 'relative', borderRadius: "5px" }}>
                  <div style={{ width: `${(100*userJoinWorkspace.user.badge.points)/userJoinWorkspace.user.badge.pointLimit}%`, height: '100%', backgroundColor: '#8da9c4', transition: 'width 0.5s ease-in-out', borderRadius: "5px" }} ></div>
                </div>
              </div>
              <div className='mx-4'><p className='m-0'>level {userJoinWorkspace.user.badge.badgeLevel}</p></div>
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