import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { retrieveTaskApi } from "../../../api/ExecutiveInsightApiService"
import { useAuth } from "../../../security/AuthContext";

export default function TeamTaskDetailsComponent(props) {
    const [task, setTask] = useState([]);
    const [productName, setProductName] = useState('');
    const navigate = useNavigate();
    const authContext = useAuth();
    useEffect(()=>{
        authContext.refresh()
        retrieveTaskApi(props.id)
            .then((response)=>{
                setTask(response.data)
                if (response.data.product!==null) {
                    setProductName(response.data.product.name)
                }
            })
            .catch((error)=>navigate('/error'))
    },[authContext, props.id, navigate])
    return (
        <div className="container mt-4">
            <h5 className="text-start">{task.name}</h5>
            <hr />
            <div className="row">
                <div className="col-md-6 text-start">
                    {task.description!=='' && 
                        <div>
                            <p>Description</p>
                            <p className="form-control border-0 shadow">{task.description}</p>
                        </div>
                    }
                    <p>Product</p>
                    <div className="d-flex">
                        {task.product===null && <p className="form-control  border-0 shadow">Product Unavailable</p>}
                        {task.product!==null && <p className="form-control  border-0 shadow">{productName}</p>}
                        <p className="form-control border-0 shadow" style={{width: "40px", marginLeft: "20px"}}>{task.quantity}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <p>Status</p>
                    <div className="d-flex text-start">
                        <p className="form-control  border-0 shadow"><FontAwesomeIcon icon={faCalendarDays} className="mx-2" />{task.startDate}</p>
                        <p className="form-control  border-0 shadow" style={{marginLeft: "5px"}}><FontAwesomeIcon icon={faCalendarDays} className="mx-2" />{task.endDate}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}