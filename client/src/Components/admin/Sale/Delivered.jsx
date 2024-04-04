import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Delivered(props) {

    const [hasDeliveries, setHasDeliveries] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const data = props.deliveries.filter(delivery =>
            delivery.task.status === "Delivered");
        setHasDeliveries(data.length > 0)
        setFiltered(data);
    },[props])

    const profile = (id) => {
        navigate(`/delivery/${id}`)
    }

    return (
        <div className="container mt-4">
            <h4>Delivered</h4>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Value</th>
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
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}