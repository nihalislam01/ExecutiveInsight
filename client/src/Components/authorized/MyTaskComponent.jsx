import { useEffect, useState } from "react"
import { useAuth } from "../../security/AuthContext"
import { retrieveTaskByUserApi } from "../../api/ExecutiveInsightApiService";
import { useNavigate, useParams } from "react-router-dom";

import TeamTaskComponent from "../admin/Team/TeamTaskComponent";
import TeamTaskDetailsComponent from "../admin/Team/TeamTaskDetailsComponent";

export default function MyTaskComponent() {

    const [hasTasks, setHasTasks] = useState(false);
    const [tasks, setTasks] = useState([{}]);
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [showListTasks, setShowListTasks] = useState(true);
    const [taskId, setTaskId] = useState(0);

    const authContext = useAuth();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        authContext.refresh()
        const getTasks = async () => {
            await retrieveTaskByUserApi(id)
            .then((response)=>{
                setHasTasks(response.data.length > 0)
                setTasks(response.data)
            })
            .catch((error)=>{
                console.log("Error fetching tasks: " + error)
                navigate('/error')
            })
        }

        getTasks();

    },[authContext, id, navigate])

    return (
            <div className="background-04">
                {showListTasks && <TeamTaskComponent setShowTaskDetails={setShowTaskDetails} setShowTasks={setShowListTasks} tasks={tasks} hasTasks={hasTasks} setTaskId={setTaskId} />}
                {showTaskDetails && <TeamTaskDetailsComponent id={taskId}/>}
            </div>
    )
}