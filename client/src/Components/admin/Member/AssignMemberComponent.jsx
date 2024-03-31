import { Overlay, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { assignUserToPostApi, assignUserToTeamApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

export default function AssignMemberComponent(props) {

    const navigate = useNavigate();
    const authContext = useAuth();

    const assignPost = (postId, email) => {
        authContext.refresh();
        assignUserToPostApi(email, props.workspaceCode, postId)
            .then((response) => {
                window.location.href = `/members/${props.id}`;
            })
            .catch((error) => navigate('/error'))
    }

    const assignTeam = (teamId, email) => {
        authContext.refresh()
        assignUserToTeamApi(email, teamId)
            .then((response) => {
                window.location.href = `/members/${props.id}`;
            })
            .catch((error) => navigate('/error'))
    }

    return (
        <div>
            <Overlay target={props.postTarget.current} show={props.showPosts} placement="left">
                <Popover id={props.userJoinWorkspace.userJoinWorkspaceId}>
                    <Popover.Header as="h3">Assign User To A Post</Popover.Header>
                    <Popover.Body className='m-0 p-0'>
                    <table className="table text-center m-0 p-0">
                        <tbody>
                                {props.hasPosts &&
                                    props.posts.map(
                                        post => (
                                            <tr key={post.postId}>
                                                <td className='m-0 p-0'><button className="btn btn-light form-control" onClick={() => assignPost(post.postId, props.userJoinWorkspace.user.email)}>{post.title}</button></td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    </Popover.Body>
                </Popover>
            </Overlay>
            <Overlay target={props.teamTarget.current} show={props.showTeams} placement="left">
                <Popover id={props.userJoinWorkspace.userJoinWorkspaceId}>
                    <Popover.Header as="h3">Assign User To A Team</Popover.Header>
                    <Popover.Body className='m-0 p-0'>
                    <table className="table text-center m-0 p-0">
                        <tbody>
                                {props.hasTeams &&
                                    props.teams.map(
                                        team => (
                                            <tr key={team.teamId}>
                                                <td className='m-0 p-0'><button className="btn btn-light form-control" onClick={() => assignTeam(team.teamId, props.userJoinWorkspace.user.email)}>{team.name}</button></td>
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