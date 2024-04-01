import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deleteProductApi } from "../../../api/ExecutiveInsightApiService";

import ProducFormComponent from "./ProductFormComponent";

import '../../../styles/ProductComponent.css'

export default function ProductConponent(props) {

    const [showForm, setShowForm] = useState(false);

    const openEditForm = () => {
        setShowForm(true);
    }

    const deleteProduct = async () => {
        await deleteProductApi(props.product.productId)
            .then((response) => toast.success(response.data))
            .catch((error) => {
                console.log("Error deleting product: " + error)
                toast.error("Something went wrong")
            })
    }

    return (
        <div>
            <Toaster />
            {showForm && <ProducFormComponent setShow={setShowForm} id={props.id} isEdit={true} product={props.product} />}
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