import '../../../styles/ProfileHeaderComponent.css';

export default function TeamHeaderComponent(props) {
    const showMembers = () => {
        props.setShowMembers(true);
        props.setShowTasks(false);
        props.setShowTaskDetails(false);
    }
    const showTasks = () => {
        props.setShowMembers(false);
        props.setShowTasks(true);
        props.setShowTaskDetails(false);
    }
    return (
        <div className="nav py-3 px-3 border-bottom border-5">
            <p className="option" onClick={showMembers}>Member</p>
            <p className="option" onClick={showTasks}>Task</p>
        </div>
    )
}