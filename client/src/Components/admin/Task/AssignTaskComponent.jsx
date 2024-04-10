import { Image, Overlay, Popover } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";

import { assignTaskToMemberApi, assignTaskToTeamApi } from "../../../api/ExecutiveInsightApiService";

import profileImage from '../../../assets/executive-insight-blank-user.png';

export default function AssignTaskComponent(props) {


  const assignMember = async (userId) => {
      await assignTaskToMemberApi(userId, props.task.taskId)
        .then((response)=> {
          props.setShowMembers(false);
          toast.success("Task assigned to a user")
        })
        .catch((error)=>{
          props.setShowMembers(false);
          toast.error(error.response.data);
        })
  }

  const assignTeam = async (teamId) => {
    await assignTaskToTeamApi(teamId, props.task.taskId)
        .then((response)=> {
          props.setShowTeams(false);
          toast.success("Task assigned to a team")
        })
        .catch((error)=>{
          props.setShowTeams(false);
          toast.error(error.response.data);
        })
  }
    return (
        <div>
          <div><Toaster/></div>
        <Overlay target={props.memberTarget.current} show={props.showMembers} placement="left" ref={props.memberRef}>
            <Popover id={props.task.taskId}>
              <Popover.Header as="h3">Assign Task To A Member</Popover.Header>
                <Popover.Body className='m-0 p-0'>
                  <table className="table text-center m-0 p-0">
                    <tbody>
                      {props.hasUsers &&
                          props.users.map(
                              user => (
                                  <tr key={user.user.userId}>
                                      <td className='m-0 p-0'>
                                        <div className="btn btn-light form-control d-flex" onClick={() => assignMember(user.user.userId)}>
                                          {user.user.image===null && <Image src={profileImage} alt="Profile" roundedCircle style={{ width: '20px', height: '20px' }} className='mx-2' />}
                                          {user.user.image!==null && <Image src={`data:image/png;base64,${user.user.image}`} alt="Profile" roundedCircle style={{ width: '20px', height: '20px' }} className='mx-2' />}
                                          <p className="m-0">{user.user.name}</p>
                                        </div>
                                      </td>
                                  </tr>
                              )
                          )
                      }
                    </tbody>
                  </table>
                </Popover.Body>
            </Popover>
        </Overlay>
        <Overlay target={props.teamTarget.current} show={props.showTeams} placement="left" ref={props.teamRef}>
            <Popover id={props.task.taskId}>
              <Popover.Header as="h3">Assign Task To A Team</Popover.Header>
                <Popover.Body className='m-0 p-0'>
                  <table className="table text-center m-0 p-0">
                    <tbody>
                      {props.hasTeams &&
                          props.teams.map(
                              team => (
                                  <tr key={team.teamId}>
                                      <td className='m-0 p-0'><button className="btn btn-light form-control" onClick={() => assignTeam(team.teamId)}>{team.name}</button></td>
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
    )
}