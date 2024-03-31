import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import { retrieveTaskByTeamApi } from "../../../api/ExecutiveInsightApiService";

import '../../../styles/ListComponent.css';

export default function TeamTaskComponent(props) {
    const [hasTasks, setHasTasks] = useState(false);
    const [tasks, setTasks] = useState([{}]);
    const navigate = useNavigate();
    useEffect(()=>{
        retrieveTaskByTeamApi(props.id)
            .then((response)=>{
                setHasTasks(response.data.length > 0)
                setTasks(response.data)
            })
            .catch((error)=> {
                console.log(error)
                navigate('/error')
            })
    },[navigate, props.id])
    const goToDetails =(id) => {
        props.setShowTasks(false);
        props.setShowTaskDetails(true);
        props.setTaskId(id);
    }
    return (
        <div className="container">
            <h2 className="text-start">Tasks</h2>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Delivery</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {hasTasks &&
                        tasks.map(task=>(
                            <tr key={task.taskId} className="mb-2">
                                <td>{task.name}</td>
                                {task.product!==null && <td>{task.product.name}</td>}
                                {task.product===null && <td>Product Unavailable</td>}
                                <td>{task.quantity}</td>
                                <td>{task.endDate}</td>
                                <td className="button"><FontAwesomeIcon icon={faCheck} /></td>
                                <td className="button" onClick={() => goToDetails(task.taskId)}><FontAwesomeIcon icon={faCircleInfo} /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}