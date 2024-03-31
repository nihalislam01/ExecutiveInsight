import '../../../styles/ProfileHeaderComponent.css';

export default function TeamHeaderComponent(props) {
    const showMembers = () => {
        props.setShowMembers(true);
        props.setShowTasks(false);
        props.setShowDeliveries(false);
        props.setShowTaskDetails(false);
    }
    const showTasks = () => {
        props.setShowMembers(false);
        props.setShowTasks(true);
        props.setShowDeliveries(false);
        props.setShowTaskDetails(false);
    }
    const showDeliveries = () => {
        props.setShowMembers(false);
        props.setShowTasks(false);
        props.setShowDeliveries(true);
        props.setShowTaskDetails(false);
    }
    return (
        <div className="nav py-3 px-3 mb-3 border-bottom border-light border-5">
            <p className="option" onClick={showMembers}>Member</p>
            <p className="option" onClick={showTasks}>Task</p>
            <p className="option" onClick={showDeliveries}>Delivery</p>
        </div>
    )
}