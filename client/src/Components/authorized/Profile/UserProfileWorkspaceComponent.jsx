import { useNavigate } from "react-router-dom";

export default function UserProfileWorkspace({ workspace }) {

    const navigate = useNavigate();

    const selectColor = (id) => {
        const customColors = ["3a5a40", "7f5539", "588157", "30638e", "3c6e71", "ad2831", "495057", "b5838d", "6a4c93", "ee6c4d"];
        return customColors[id%10];
    }

    const goToWorkspace = (id) => {
        navigate(`/workspace-profile/${id}`)
    }

    return (
        <div className="col-12 col-md-6">
            <div className={`btn w-100 text-start`} style={{backgroundColor: `#${selectColor(workspace.workspaceId)}`, color: "white"}}>
                <h4>{workspace.name}</h4>
                <p className="pb-5" onClick={() => goToWorkspace(workspace.workspaceId)}>{workspace.businessTitle.title}</p>
            </div>
        </div>
    )
}