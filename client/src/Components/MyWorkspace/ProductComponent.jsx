import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProductComponent from "./AddProductComponent";
import '../styles/ProductComponent.css'
import { useState } from "react";
import { deleteProductApi } from "../api/ExecutiveInsightApiService";
import { useNavigate } from "react-router-dom";

export default function ProductConponent(props) {

    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    function openEditForm() {
        setShowForm(true);
    }

    function deleteProduct() {
        deleteProductApi(props.product.productId)
        .then((Response) => window.location.href = `/products/${props.id}`)
        .catch((error) => navigate('/error'))
    }

    return (
        <div>
            {showForm && <AddProductComponent setShow={setShowForm} id={props.id} isEdit={true} product={props.product} />}
            <div className="form-control d-flex justify-content-between p-3" style={{ backgroundColor: "#e9ecef" }}>
                <p className="m-0">{props.product.name}</p>
                <div>
                    <FontAwesomeIcon icon={faPenToSquare} className="mx-4 icon" onClick={openEditForm}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faTrashCan} className="mx-2 icon" onClick={deleteProduct}></FontAwesomeIcon>
                </div>
            </div>
        </div>
    )
}