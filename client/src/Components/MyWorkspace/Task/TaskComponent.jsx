import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { Overlay, Popover } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { retrieveUsersByWorkspaceIdApi, retrieveWorkspaceByIdApi } from "../../api/ExecutiveInsightApiService";
import AssignTaskComponent from "./AssignTaskComponent";

export default function TaskComponent(props) {

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
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        if (memberRef.current && !memberRef.current.contains(event.target)) {
          if (teamRef.current && !teamRef.current.contains(event.target)) {
            setShowOptions(false);
            setShowMembers(false);
            setShowTeams(false);
          }
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  function handleOptionClick() {
    setShowOptions(!showOptions)
    setShowMembers(false);
    setShowTeams(false);
  }

  function handleShowMember() {
    retrieveUsersByWorkspaceIdApi(props.id)
      .then((response) => {
        setHasUsers(response.data.length > 0)
        setUsers(response.data)
      })
      .catch((error)=>navigate('/error'))
    setShowMembers(!showMembers)
    setShowTeams(false);
  }

  function handleShowTeam() {
    retrieveWorkspaceByIdApi(props.id)
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
        <td>{props.task.endDate}</td>
        <td>{props.task.status}</td>
        <td onClick={handleOptionClick}><FontAwesomeIcon icon={faEllipsisVertical} ref={optionTarget} /></td>
        <Overlay target={optionTarget.current} show={showOptions} placement="bottom" ref={formRef}>
            <Popover id={props.task.taskId}>
                <Popover.Body className='m-0 p-0'>
                  <Link className="btn btn-light form-control" to={`/task/${props.id}/${props.task.taskId}`}>Show task details</Link>
                    <button className="btn btn-light form-control" ref={memberTarget} onClick={handleShowMember}>Assign Task To a Member</button>
                    <button className="btn btn-light form-control" ref={teamTarget} onClick={handleShowTeam}>Assign Task To a Team</button>
                </Popover.Body>
            </Popover>
        </Overlay>
        <AssignTaskComponent memberTarget={memberTarget} showMembers={showMembers} task={props.task} hasUsers={hasUsers} users={users} teamTarget={teamTarget} showTeams={showTeams} hasTeams={hasTeams} teams={teams} id={props.id} memberRef={memberRef} teamRef={teamRef}  />
      </tr>
  )
}