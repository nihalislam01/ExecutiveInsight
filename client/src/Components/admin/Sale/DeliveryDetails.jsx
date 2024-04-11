import { useNavigate, useParams } from "react-router-dom"
import SidebarComponent from "../SidebarComponent"
import { useEffect, useState } from "react";
import { useAuth } from "../../../security/AuthContext";
import { retrieveDeliveryApi } from "../../../api/ExecutiveInsightApiService";

export default function DeliveryDetails() {

    const [delivery, setDelivery] = useState([]);
    const [task, setTask] = useState([]);
    const [product, setProduct] = useState([]);

    const {id} = useParams();
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        authContext.refresh()
        const getDelivery = async () => {
            await retrieveDeliveryApi(id)
            .then((response)=>{
                setDelivery(response.data)
                setTask(response.data.task)
                setProduct(response.data.task.product)
            })
            .catch((error)=>{
                console.log("Error fetching delivery: " + error)
                navigate('/error')
            })
        }

        getDelivery()

    },[authContext, id, navigate])

    return (
        <div className="d-flex">
            <SidebarComponent />
            <div className="background-10 w-100 p-4">
                <div className="w-50 text-start" style={{ marginLeft: "20px" }}>
                    <h6>Task Name</h6>
                    <div className="form-control">{task.name}</div>
                    <h6>Product</h6>
                    {product!==null && <div className="form-control">{product.name}</div>}
                    {product===null && <div className="form-control">Produt Unavailable</div>}
                    <h6>Quantity</h6>
                    <div className="form-control">{task.quantity}</div>
                    <h6>Description</h6>
                    <div className="form-control">{delivery.description}</div>
                    <h6>Reference/Receipt</h6>
                    <div className="form-control">{delivery.receipt}</div>
                    <h6>Value</h6>
                    <div className="form-control">{task.money}</div>
                    <h6>Status</h6>
                    <div className="form-control">{task.status}</div>
                </div>
            </div>
        </div>
    )
}