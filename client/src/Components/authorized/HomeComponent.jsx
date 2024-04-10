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
        const customColors = ["3a5a40", "7f5539", "588157", "30638e", "3c6e71", "ad2831", "495057", "b5838d", "6a4c93", "ee6c4d"];
        return customColors[id%10];
    }

    const goToWorkspace = (id) => {
        navigate(`/workspace-profile/${id}`)
    }

    return (
        <div className='background-03'>
            <div className='container mt-4'>
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
                                            <td style={{background: "none"}}>
                                                <button className={`btn form-control text-start pb-5`}
                                                        onClick={() => goToWorkspace(workspace.workspaceId)}
                                                        style={{ backgroundColor: `#${selectColor(workspace.workspaceId)}`, color: "white" }}
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