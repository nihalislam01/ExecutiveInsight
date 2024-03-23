import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Overlay, Popover } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TaskComponent(props) {

  const optionTarget = useRef(null);
  const formRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  function handleOptionClick() {
    setShowOptions(!showOptions)
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
                    {/* <button className="btn btn-light form-control" ref={postTarget} onClick={handleShowPost}>Assign User To a Post</button>
                    <button className="btn btn-light form-control" ref={teamTarget} onClick={handleShowTeam}>Assign User To a Team</button> */}
                </Popover.Body>
            </Popover>
        </Overlay>
      </tr>
  )
}