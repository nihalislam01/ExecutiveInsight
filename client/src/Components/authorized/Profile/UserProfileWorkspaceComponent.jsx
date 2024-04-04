import { useNavigate } from "react-router-dom";

export default function UserProfileWorkspace({ workspace }) {

    const navigate = useNavigate();

    const selectColor = (id) => {
        const colors = ["info", "success", "primary", "secondary"]
        return colors[id%4];
    }

    const goToWorkspace = (id) => {
        navigate(`/workspace-profile/${id}`)
    }

    return (
        <div className="col-12 col-md-6">
            <div className={`btn btn-outline-${selectColor(workspace.workspaceId)} w-100 text-start`}>
                <h4>{workspace.name}</h4>
                <p className="pb-5" onClick={() => goToWorkspace(workspace.workspaceId)}>{workspace.businessTitle.title}</p>
            </div>
        </div>
    )
}