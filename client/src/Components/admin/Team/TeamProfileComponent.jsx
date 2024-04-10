import { useEffect, useState } from "react"
import TeamHeaderComponent from "./TeamHeaderComponent"
import TeamMembersComponent from "./TeamMembersComponent";
import TeamTaskComponent from "./TeamTaskComponent";
import { useNavigate, useParams } from "react-router-dom";
import TeamTaskDetailsComponent from "./TeamTaskDetailsComponent";
import { useAuth } from "../../../security/AuthContext";
import { retrieveTaskByTeamApi } from "../../../api/ExecutiveInsightApiService";
import SidebarComponent from '../SidebarComponent';

export default function TeamProfileComponent() {
    const [showMembers, setShowMembers] = useState(true);
    const [showTasks, setShowTasks] = useState(false);
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [taskId, setTaskId] = useState(0);
    const [hasTasks, setHasTasks] = useState(false);
    const [tasks, setTasks] = useState([{}]);
    const {id, wId } = useParams();

    const navigate = useNavigate();
    const authContext = useAuth();
    const isMine = authContext.isMine(wId);

    useEffect(()=>{
        authContext.refresh();
        retrieveTaskByTeamApi(id)
            .then((response)=>{
                setHasTasks(response.data.length > 0)
                setTasks(response.data)
            })
            .catch((error)=> {
                console.log(error)
                navigate('/error')
            })
    },[authContext, navigate, id])

    return (
        <div>
            {isMine && 
                <div className="d-flex">
                    <SidebarComponent />
                    <div className="background-04 w-100">
                        <TeamHeaderComponent setShowMembers={setShowMembers} setShowTasks={setShowTasks} setShowTaskDetails={setShowTaskDetails} />
                        {showMembers && <TeamMembersComponent id={id} wId={wId} />}
                        {showTasks && <TeamTaskComponent setShowTaskDetails={setShowTaskDetails} setShowTasks={setShowTasks} tasks={tasks} hasTasks={hasTasks} setTaskId={setTaskId} />}
                        {showTaskDetails && <TeamTaskDetailsComponent id={taskId}/>}
                    </div>
                </div>
            }
            {!isMine && 
                <div className="background-04">
                    <TeamHeaderComponent setShowMembers={setShowMembers} setShowTasks={setShowTasks} setShowTaskDetails={setShowTaskDetails} />
                    {showMembers && <TeamMembersComponent id={id} wId={wId} />}
                    {showTasks && <TeamTaskComponent setShowTaskDetails={setShowTaskDetails} setShowTasks={setShowTasks} tasks={tasks} hasTasks={hasTasks} setTaskId={setTaskId} />}
                    {showTaskDetails && <TeamTaskDetailsComponent id={taskId}/>}
                </div>
            }
        </div>
    )
}