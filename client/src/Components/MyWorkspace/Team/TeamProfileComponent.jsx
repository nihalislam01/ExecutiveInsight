import { useState } from "react"
import TeamHeaderComponent from "./TeamHeaderComponent"
import TeamMembersComponent from "./TeamMembersComponent";
import TeamTaskComponent from "./TeamTaskComponent";
import TeamDeliveryComponent from "./TeamDeliveryComponent";
import { useParams } from "react-router-dom";

export default function TeamProfileComponent() {
    const [showMembers, setShowMembers] = useState(true);
    const [showTasks, setShowTasks] = useState(false);
    const [showDeliveries, setShowDeliveries] = useState(false);

    const {id} = useParams();

    return (
        <div>
            <TeamHeaderComponent setShowMembers={setShowMembers} setShowTasks={setShowTasks} setShowDeliveries={setShowDeliveries} />
            {showMembers && <TeamMembersComponent id={id} />}
            {showTasks && <TeamTaskComponent />}
            {showDeliveries && <TeamDeliveryComponent />}
        </div>
    )
}