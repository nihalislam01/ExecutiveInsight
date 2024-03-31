import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createTaskApi, retrieveProductsApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

export default function AddTaskComponent(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [hasProducts, setHasProducts] = useState(false);
    const [products, setProducts] = useState([{}]);
    const [productId, setProductId] = useState(0);
    const [endDate, setEndDate] = useState('');
    const [value, setValue] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('success');
    const [message, setMessage] = useState('');
    const authContext = useAuth();
    const navigate = useNavigate();

    const formRef = useRef(null);

    useEffect(() => {
        authContext.refresh()
        retrieveProductsApi(props.id)
        .then((response) => {
            setHasProducts(response.data.length > 0)
            setProducts(response.data)
            if (response.data.length > 0) {
                setProductId(response.data[0].productId)
            }
        })
        .catch((error) => navigate('/error'))
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
              props.setShow(false);
            }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [authContext, navigate, props])

    const handleNameChange = (event) => {
        setShowAlert(false)
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setShowAlert(false)
        setDescription(event.target.value);
    }

    const handleProduct = (event) => {
        setShowAlert(false)
        setProductId(event.target.value)
    }

    const handleQuantityChange = (event) => {
        setShowAlert(false)
        setQuantity(event.target.value)
    }

    const handleValueChange = (event) => {
        setShowAlert(false)
        setValue(event.target.value)
    }

    const handlePlus = () => {
        setShowAlert(false)
        let n = parseInt(quantity);
        n += 1;
        setQuantity(n.toString());
    }

    const handleMinus = () => {
        setShowAlert(false)
        let n = parseInt(quantity);
        if (n>1) {
            n -= 1;
            setQuantity(n.toString());
        }
    }

    const handleDateChange = (event) => {
        setShowAlert(false)
        setEndDate(event.target.value)
    }

    const setNotShow = () => {
        props.setShow(false);
    }

    const addTask = () => {
        const task = {
            workspaceId: props.id,
            productId: productId,
            name: name,
            description: description,
            quantity: quantity,
            value: value,
            endDate: endDate
        }
        createTaskApi(task)
        .then((response) => window.location.href = `/tasks/${props.id}`)
        .catch((error) => {
            setAlertColor('danger');
            setMessage(error.response.data);
            setShowAlert(true)
        })
    }

    return (
        <div className='justify-content-center position-fixed z-1' style={{ width: "600px", top: "100px", left: "500px" }} ref={formRef}>
            {showAlert && <div className={`alert alert-${alertColor} shadow`}>{message}</div>}
            <div className="card shadow">
                <div className="card-header text-center p-3">
                    <h5>Create New Task</h5>
                </div>
                <div className="card-body text-start">
                    <form>
                        <div className="form-group">
                            <label className="col-form-label m-0">Task Name</label>
                            <input type="text" className="form-control" value={name} onChange={handleNameChange} />
                            <label className="col-form-label m-0">Description</label>
                            <textarea type="text" className="form-control" value={description} placeholder="(Optional)" onChange={handleDescriptionChange} />
                            <div className="d-flex justify-content-between">
                                <div className="w-100">
                                <label className="col-form-label m-0">Select Product</label>
                                <select className="form-select" onChange={handleProduct}>
                                    { hasProducts &&
                                        products.map(
                                            product => (
                                                <option key={product.productId} value={product.productId}>{product.name}</option>
                                            )
                                        )
                                    }
                                </select>
                                </div>
                                <div className="d-flex align-items-center" style={{ marginTop: "35px", marginLeft: "40px" }}>
                                    <FontAwesomeIcon icon={faMinus} onClick={handleMinus}/>
                                    <input type="text" className="form-control mx-2" value={quantity} onChange={handleQuantityChange} style={{height: "38px", width: "45px"}} />
                                    <FontAwesomeIcon icon={faPlus} onClick={handlePlus}/>
                                </div>
                            </div>
                            <label className="col-form-label m-0">Value</label>
                            <input type="text" className="form-control" value={value} placeholder="TK" onChange={handleValueChange} />
                            <label className="col-form-label m-0">Delivery Date</label>
                            <input type="date" className="form-control" value={endDate} onChange={handleDateChange} />
                        </div>
                    </form>
                    <hr />
                    <div className="text-end">
                        <button type="button" className="btn btn-secondary mx-2" onClick={setNotShow}>Close</button>
                        <button type="button" className="btn btn-success" onClick={addTask}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}