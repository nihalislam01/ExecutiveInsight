import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { retrieveTaskApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

import TaskDetailsComponent from "./TaskDetailsComponent";
import EditTaskComponent from "./EditTaskComponent";

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
                .catch((error)=>navigate('/error'))
        }

        getTask();
        
    },[authContext, taskId, navigate])

    const setNotEdit = () => {
        setIsEdit(false);
    }

    return (
        <div>
            {!isEdit && <TaskDetailsComponent task={task} setIsEdit={setIsEdit} productName={productName} />}
            {isEdit && <EditTaskComponent setNotEdit={setNotEdit} taskId={taskId} workspaceId={workspaceId} />}
        </div>
    )
}