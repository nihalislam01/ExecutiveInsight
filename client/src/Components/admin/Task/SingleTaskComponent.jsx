import { useEffect, useState, useRef } from "react";
import { Overlay, Popover } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { faEllipsisVertical, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { retrieveUsersByWorkspaceIdApi, retrieveWorkspaceByIdApi } from "../../../api/ExecutiveInsightApiService";

import AssignTaskComponent from "./AssignTaskComponent";

export default function SingleTaskComponent(props) {

  const [showOptions, setShowOptions] = useState(false);
  const optionTarget = useRef(null);

  const [showMembers, setShowMembers] = useState(false);
  const [hasUsers, setHasUsers] = useState(false);
  const [users, setUsers] = useState([{}]);
  const memberTarget = useRef(null);

  const [showTeams, setShowTeams] = useState(false);
  const [hasTeams, setHasTeams] = useState(false);
  const [teams, setTeams] = useState([{}]);
  const teamTarget = useRef(null);

  const formRef = useRef(null);
  const memberRef = useRef(null);
  const teamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((formRef.current && !formRef.current.contains(event.target))) {
        setShowOptions(false);
        if((memberRef.current && !memberRef.current.contains(event.target)) || (teamRef.current && !teamRef.current.contains(event.target))) {
          setShowMembers(false);
          setShowTeams(false);
      }
    }
  }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  const handleOptionClick = () => {
    setShowOptions(!showOptions)
    setShowMembers(false);
    setShowTeams(false);
  }

  const handleShowMember = async () => {
    await retrieveUsersByWorkspaceIdApi(props.id)
        .then((response) => {
          setHasUsers(response.data.length > 0)
          setUsers(response.data)
        })
        .catch((error)=>navigate('/error'))
    setShowMembers(!showMembers)
    setShowTeams(false);
  }

  const handleShowTeam = async () => {
    await retrieveWorkspaceByIdApi(props.id)
        .then((response)=>{
          setHasTeams(response.data.teams.length > 0)
          setTeams(response.data.teams)
        })
        .catch((error)=>navigate('/error'))
    setShowTeams(!showTeams);
    setShowMembers(false);
  }

  return (
      <tr>
        <td>{props.task.name}</td>
        {props.task.product===null && <td>Product Unavailable</td>}
        {props.task.product!==null && <td>{props.task.product.name}</td>}
        <td>{props.task.quantity}</td>
        <td>{props.task.money}</td>
        <td>{props.task.endDate}</td>
        <td>{props.task.status}</td>
        <td><Link to={`/task/${props.id}/${props.task.taskId}`} style={{color: "black"}}><FontAwesomeIcon icon={faCircleInfo} /></Link></td>
        <td ref={optionTarget} onClick={handleOptionClick} className="ellipsis"><FontAwesomeIcon icon={faEllipsisVertical} /></td>
        <Overlay target={optionTarget.current} show={showOptions} placement="bottom" ref={formRef}>
            <Popover id={props.task.taskId}>
                <Popover.Body className='m-0 p-0'>
                    <button className="btn btn-light form-control" ref={memberTarget} onClick={handleShowMember}>Assign Task To a Member</button>
                    <button className="btn btn-light form-control" ref={teamTarget} onClick={handleShowTeam}>Assign Task To a Team</button>
                </Popover.Body>
            </Popover>
        </Overlay>
        <AssignTaskComponent memberTarget={memberTarget} showMembers={showMembers} task={props.task} hasUsers={hasUsers} users={users} teamTarget={teamTarget} showTeams={showTeams} hasTeams={hasTeams} teams={teams} id={props.id} memberRef={memberRef} teamRef={teamRef} setShowMembers={setShowMembers} setShowTeams={setShowTeams}  />
      </tr>
  )
}