import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { retrieveTaskApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

import TaskDetailsComponent from "./TaskDetailsComponent";
import EditTaskComponent from "./EditTaskComponent";
import SidebarComponent from "../SidebarComponent";

export default function TaskProfileComponent() {

    const [task, setTask] = useState([]);
    const [productName, setProductName] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const authContext = useAuth();
    const navigate = useNavigate();
    const {workspaceId, taskId} = useParams();

    useEffect(()=>{
        authContext.refresh()
        const getTask = async () => {
            await retrieveTaskApi(taskId)
                .then((response)=>{
                    setTask(response.data)
                    if (response.data.product!==null) {
                        setProductName(response.data.product.name);
                    }
                })
                .catch((error)=>{
                    console.log("Error fetching task: " + error)
                    navigate('/error')
                })
        }

        getTask();
        
    },[authContext, taskId, navigate])

    const setNotEdit = () => {
        setIsEdit(false);
    }

    return (
        <div className="d-flex">
            <SidebarComponent />
            <div className="background-13 p-4 w-100">
                {!isEdit && <TaskDetailsComponent task={task} setIsEdit={setIsEdit} productName={productName} />}
                {isEdit && <EditTaskComponent setNotEdit={setNotEdit} taskId={taskId} workspaceId={workspaceId} />}
            </div>
        </div>
    )
}