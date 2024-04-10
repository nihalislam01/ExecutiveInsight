import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import DeliveryFormComponent from "../../authorized/DeliveryFormComponent";

import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../security/AuthContext";
import { retrieveWorkspaceIdApi } from "../../../api/ExecutiveInsightApiService";

export default function TeamTaskComponent(props) {

    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);
    const [tId, setTId] = useState(0);
    const [workspaceId, setWorkspaceId] = useState(0);
    const {wId} = useParams();
    const authContext = useAuth();
    const navigate = useNavigate();
    const isMine = authContext.isMine(wId);

    const goToDetails =(id) => {
        props.setShowTasks(false);
        props.setShowTaskDetails(true);
        props.setTaskId(id);
    }

    const handleForm = async (taskId) => {
        await retrieveWorkspaceIdApi(taskId)
            .then((response)=>setWorkspaceId(response.data))
            .catch((error)=>{
                console.log(error)
                navigate('/error')
            })
        setTId(taskId)
        setShowForm(true)
    }

    const setSuccess = () => {
        setShowForm(false);
        toast.success("Delivery Request Sent")
    }

    const setError = () => {
        setShowForm(false);
        toast.error("Error sending delivery request")
    }


    return (
        <div className="p-4">
            <Toaster />
            {showForm && <DeliveryFormComponent formRef={formRef} setShowForm={setShowForm} taskId={tId} wId={workspaceId} setSuccess={setSuccess} setError={setError} />}
            <h2 className="text-start">Tasks</h2>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Delivery</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.hasTasks &&
                        props.tasks.map(task=>(
                            <tr key={task.taskId} className="mb-2">
                                <td>{task.name}</td>
                                {task.product!==null && <td>{task.product.name}</td>}
                                {task.product===null && <td>Product Unavailable</td>}
                                <td>{task.quantity}</td>
                                <td>{task.endDate}</td>
                                <td>{task.status}</td>
                                {task.status!=="Pending" && task.status!=="Delivered" && !isMine && <td className="ellipsis" onClick={() => handleForm(task.taskId)}><FontAwesomeIcon icon={faCheck} /></td>}
                                <td className="ellipsis" onClick={() => goToDetails(task.taskId)}><FontAwesomeIcon icon={faCircleInfo} /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}