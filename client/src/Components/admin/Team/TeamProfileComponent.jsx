import { useState } from "react"
import TeamHeaderComponent from "./TeamHeaderComponent"
import TeamMembersComponent from "./TeamMembersComponent";
import TeamTaskComponent from "./TeamTaskComponent";
import TeamDeliveryComponent from "./TeamDeliveryComponent";
import { useParams } from "react-router-dom";
import TeamTaskDetailsComponent from "./TeamTaskDetailsComponent";

export default function TeamProfileComponent() {
    const [showMembers, setShowMembers] = useState(true);
    const [showTasks, setShowTasks] = useState(false);
    const [showDeliveries, setShowDeliveries] = useState(false);
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [taskId, setTaskId] = useState(0);

    const {id} = useParams();

    return (
        <div>
            <TeamHeaderComponent setShowMembers={setShowMembers} setShowTasks={setShowTasks} setShowDeliveries={setShowDeliveries} setShowTaskDetails={setShowTaskDetails} />
            {showMembers && <TeamMembersComponent id={id} />}
            {showTasks && <TeamTaskComponent id={id} setShowTaskDetails={setShowTaskDetails} setShowTasks={setShowTasks} setTaskId={setTaskId} />}
            {showDeliveries && <TeamDeliveryComponent />}
            {showTaskDetails && <TeamTaskDetailsComponent id={taskId}/>}
        </div>
    )
}