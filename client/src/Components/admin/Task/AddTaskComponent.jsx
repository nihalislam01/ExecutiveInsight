import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createEventApi, createTaskApi, retrieveProductsApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function AddTaskComponent(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [hasProducts, setHasProducts] = useState(false);
    const [products, setProducts] = useState([{}]);
    const [productId, setProductId] = useState(0);
    const [endDate, setEndDate] = useState('');
    const [value, setValue] = useState('');
    const authContext = useAuth();
    const navigate = useNavigate();

    const formRef = useRef(null);

    useEffect(() => {
        authContext.refresh()
        const getProducts = async () => {
            await retrieveProductsApi(props.id)
                .then((response) => {
                    setHasProducts(response.data.length > 0)
                    setProducts(response.data)
                })
                .catch((error) => {
                    console.log("Error fetching products: " + error)
                    navigate('/error')
                })
        }

        getProducts();

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
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleProduct = (event) => {
        setProductId(event.target.value)
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value)
    }

    const handleValueChange = (event) => {
        setValue(event.target.value)
    }

    const handlePlus = () => {
        setQuantity(quantity + 1);
    }

    const handleMinus = () => {
        if (quantity >= 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleDateChange = (event) => {
        setEndDate(event.target.value)
    }

    const setNotShow = () => {
        props.setShow(false);
    }

    const addTask = async () => {
        const task = {
            workspaceId: props.id,
            productId: productId,
            name: name,
            description: description,
            quantity: quantity,
            value: value,
            endDate: endDate
        }
        await createTaskApi(task)
            .then((response) => {
                setNotShow()
                toast.success("Task added")
            })
            .catch((error) => toast.error(error.response.data))
        await createEventApi(task)
    }

    return (
        <div>
            <Toaster />
            <div className='d-flex justify-content-center position-fixed z-1' style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} ref={formRef}>
                <div style={{width: "600px"}}>
                    <div className="card shadow">
                        <div className="card-header p-3">
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
                                            <option value={0}>None</option>
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
                                <button type="button" className="button-06 mx-2" onClick={setNotShow}>Close</button>
                                <button type="button" className="button-08" onClick={addTask}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}