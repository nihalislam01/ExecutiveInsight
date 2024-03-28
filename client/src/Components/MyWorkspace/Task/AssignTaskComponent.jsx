import { Overlay, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { assignTaskToMemberApi, assignTaskToTeamApi } from "../../api/ExecutiveInsightApiService";
import { useAuth } from "../../security/AuthContext";

export default function AssignTaskComponent(props) {

  const navigate = useNavigate();
  const authContext = useAuth();

  function assignMember(userId) {
    authContext.refresh();
    assignTaskToMemberApi(userId, props.task.taskId)
      .then((response)=> window.location.href = `/tasks/${props.id}`)
      .catch((error)=>navigate('/error'))
  }

  function assignTeam(teamId) {
    authContext.refresh();
    assignTaskToTeamApi(teamId, props.task.taskId)
      .then((response)=> window.location.href = `/tasks/${props.id}`)
      .catch((error)=>navigate('/error'))
  }
    return (
        <div>
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
                                      <td className='m-0 p-0'><button className="btn btn-light form-control" onClick={() => assignMember(user.user.userId)}>{user.user.name}</button></td>
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