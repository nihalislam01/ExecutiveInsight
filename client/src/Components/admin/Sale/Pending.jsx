import { faCheck, faInfoCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { acceptDeliveryApi, rejectDeliveryApi } from "../../../api/ExecutiveInsightApiService";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Pending(props) {

    const [hasDeliveries, setHasDeliveries] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const data = props.deliveries.filter(delivery =>
            delivery.task.status === "Pending");
        setHasDeliveries(data.length > 0)
        setFiltered(data);
    },[props])

    const accept = async (id) => {
        await acceptDeliveryApi(id)
            .then((response)=>toast.success(response.data))
            .catch((error)=>{
                console.log("Error accepting delivery: " + error)
                toast.error("Error accepting delivery")
        })
    }

    const reject = async (id) => {
        await rejectDeliveryApi(id)
            .then((response)=>toast(response.data))
            .catch((error)=>{
                console.log("Error rejecting delivery: " + error)
                toast.error("Error rejecting delivery")
            })
    }

    const profile = (id) => {
        navigate(`/delivery/${id}`)
    }

    return (
        <div className="container mt-4">
            <Toaster />
            <h4>Pending</h4>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Value</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {hasDeliveries &&
                        filtered.map(delivery=>(
                            <tr key={delivery.deliveryId}>
                                <td>{delivery.task.name}</td>
                                {delivery.task.product===null && <td>Product Unavailable</td>}
                                {delivery.task.product!==null && <td>{delivery.task.product.name}</td>}
                                <td>{delivery.task.status}</td>
                                <td>{delivery.task.money}</td>
                                <td className="ellipsis" onClick={() => profile(delivery.deliveryId)}><FontAwesomeIcon icon={faInfoCircle} /></td>
                                <td className="ellipsis" onClick={() => reject(delivery.deliveryId)}><FontAwesomeIcon icon={faXmark} /></td>
                                <td className="ellipsis" onClick={() => accept(delivery.deliveryId)}><FontAwesomeIcon icon={faCheck} /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}