export default function UserProfileWorkspace({ workspace }) {

    function selectColor(id) {
        const colors = ["info", "success", "primary", "secondary"]
        return colors[id%4];
    }

    return (
        <div className="col-12 col-md-6">
            <div className={`btn btn-outline-${selectColor(workspace.workspaceId)} w-100 text-start`}>
                <h4>{workspace.name}</h4>
                <p className="pb-5">{workspace.businessTitle.title}</p>
            </div>
        </div>
    )
}