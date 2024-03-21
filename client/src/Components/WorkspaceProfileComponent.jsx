export default function WorkspaceProfileComponent(props) {
    return (
        <div className="text-start">
            <h1>{props.workspaceName}</h1>
            <p>{props.workspaceTitle}</p>
        </div>
    )
}