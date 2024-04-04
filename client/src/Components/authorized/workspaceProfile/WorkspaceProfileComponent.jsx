import { useState } from "react"
import WorkspaceProfileHeaderComponent from "./WorkspaceProfileHeader"
import { useParams } from "react-router-dom";
import ListTeam from "./ListTeam";
import ListTask from "./ListTask";
export default function WorkspaceProfileComponent() {

    const {id} = useParams();

    const [showTeams, setShowTeams] = useState(true);
    const [showTasks, setShowTasks] = useState(false);

    return (
        <div>
            <WorkspaceProfileHeaderComponent setShowTasks={setShowTasks} setShowTeams={setShowTeams} />
            {showTeams && <ListTeam id={id} />}
            {showTasks && <ListTask id={id} setShowTasks={setShowTasks}/>}
        </div>
    )
}