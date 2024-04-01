import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { retrieveWorkspacesByUserApi } from '../../api/ExecutiveInsightApiService';
import { useAuth } from '../../security/AuthContext';

export default function HomeComponent() {

    const [workspaces, setWorkspaces] = useState([{}]);
    const [hasWorkspaces, setHasWorkspaces] = useState(false);

    const authContext = useAuth();
    const username = authContext.username();
    const navigate = useNavigate();

    useEffect(() => {
        authContext.refresh()
        retrieveWorkspacesByUserApi(username)
            .then((response) => {
                setWorkspaces(response.data)
                setHasWorkspaces(response.data.length > 0)
            })
            .catch((error) => navigate('/error')) 
    }, [authContext, username, navigate])

    const newLine = {
        display: "block",
        marginTop: "5px" 
      }

    const selectColor = (id) => {
        const colors = ["info", "success", "primary", "secondary"]
        return colors[id%4];
    }

    const goToWorkspace = (id) => {
        navigate(`/workspace-profile/${id}`)
    }

    return (
        <div className="HomeComponent">
            <div className='container'>
                {hasWorkspaces && <h2 className='text-start mb-4'>Workspaces</h2>}
                {hasWorkspaces && <hr />}
                {!hasWorkspaces && <h5 className='mt-4'>You Haven't Joined Any Workspace Yet</h5>}
                <table className='table'>
                    <tbody>
                        {
                            hasWorkspaces &&
                                workspaces.map(
                                    workspace => (
                                        <tr key={workspace.workspaceId}>
                                            <td><button className={`btn btn-${selectColor(workspace.workspaceId)} form-control text-start pb-5`}
                                                        onClick={() => goToWorkspace(workspace.workspaceId)}
                                                >
                                                <p style={{fontSize: "50px"}}>{workspace.name}</p>
                                                <span style={newLine}></span>
                                                {workspace.businessTitle.title}
                                            </button></td>
                                        </tr>
                                    )
                                )
                            }
                    </tbody>
                </table>
            </div>
        </div>
    )
}