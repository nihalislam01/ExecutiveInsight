import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../security/AuthContext";
import TeamTaskComponent from "../../admin/Team/TeamTaskComponent";
import TeamTaskDetailsComponent from "../../admin/Team/TeamTaskDetailsComponent";
import { retrieveTaskByUserAndWorkspaceApi } from "../../../api/ExecutiveInsightApiService";

export default function ListTask(props) {
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [showListTasks, setShowListTasks] = useState(true);
    const [taskId, setTaskId] = useState(0);
    const [hasTasks, setHasTasks] = useState(false);
    const [tasks, setTasks] = useState([{}]);

    const authContext = useAuth();
    const email = authContext.username();
    const navigate = useNavigate();

    useEffect(() => {
        authContext.refresh()
        const getTasks = async () => {
            await retrieveTaskByUserAndWorkspaceApi(email, props.id)
                .then((response) => {
                    setHasTasks(response.data.length > 0);
                    setTasks(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log("Error fetching tasks: " + error)
                    navigate('/error')
                });
        }

        getTasks()

    }, [authContext, props.id, email, navigate])
    return (
        <div>
            {showListTasks&& <TeamTaskComponent setShowTaskDetails={setShowTaskDetails} setShowTasks={setShowListTasks} tasks={tasks} hasTasks={hasTasks} setTaskId={setTaskId} />}
            {showTaskDetails && <TeamTaskDetailsComponent id={taskId}/>}
        </div>
    )
}