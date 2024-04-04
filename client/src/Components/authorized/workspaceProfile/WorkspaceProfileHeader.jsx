import '../../../styles/ProfileHeaderComponent.css';

export default function WorkspaceProfileHeaderComponent(props) {

    const showTeam = () => {
        props.setShowTeams(true);
        props.setShowTasks(false);
    }

    const showTask = () => {
        props.setShowTeams(false);
        props.setShowTasks(true);
    }

    return (
        <div className="nav py-3 px-3 mb-3 border-bottom border-light border-5">
            <p className="option" onClick={showTeam}>Teams</p>
            <p className="option" onClick={showTask}>Tasks</p>
        </div>
    )
}