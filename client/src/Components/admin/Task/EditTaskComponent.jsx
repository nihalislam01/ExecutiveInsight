import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { editTaskApi, retrieveProductsApi, retrieveTaskApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext"

export default function EditTaskComponent(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [money, setMoney] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [hasProducts, setHasProducts] = useState(false);
    const [products, setProducts] = useState([{}]);
    const [productId, setProductId] = useState(0);

    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        authContext.refresh()
        const getTask = async () => {
            await retrieveTaskApi(props.taskId)
                .then((response) => {
                    setName(response.data.name)
                    setDescription(response.data.description)
                    if (response.data.product!==null) {
                        setProductId(response.data.product.productId)
                    }
                    setQuantity(response.data.quantity)
                    setMoney(response.data.money)
                    setStartDate(response.data.startDate)
                    setEndDate(response.data.endDate)
                })
                .catch((error) => {
                    console.log("Error fetching task: " + error)
                    navigate('/error')})
        }

        getTask()

        const getProducts = async () => {
            await retrieveProductsApi(props.workspaceId)
                .then((response) => {
                    setHasProducts(response.data.length > 0)
                    setProducts(response.data)
                    if (response.data.length > 0 && productId===0) {
                        setProductId(response.data[0].productId)
                    }
                })
                .catch((error) => {
                    console.log("Error fetching products: " + error)
                    navigate('/error')})
        }

        getProducts()

    },[authContext, props, navigate, productId])

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleProductChange = (event) => {
        setProductId(event.target.value)
    }

    const handlePlus = () => {
        let n = parseInt(quantity);
        n += 1;
        setQuantity(n.toString());
    }

    const handleMinus = () => {
        let n = parseInt(quantity);
        if (n>1) {
            n -= 1;
            setQuantity(n.toString());
        }
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value)
    }

    const handleMoneyChange = (event) => {
        setMoney(event.target.value)
    }

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value)
    }

    const saveChanges = async () => {
        const theTask = {
            productId: productId,
            taskId: props.taskId,
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            quantity: quantity,
            value: money
        }
        await editTaskApi(theTask)
            .then((response) => {
                props.setNotEdit()
                toast.success("Task updated")
            })
            .catch((error) => toast.error(error.response.data))
    }

    return (
        <div>
            <Toaster />
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-5 text-start" style={{marginLeft: "20px"}}>
                    <label className="m-0">Task Name</label>
                    <div className="d-flex align-items-center">
                        <input type="text" className="form-control" value={name} onChange={handleNameChange} />
                        <div className="btn btn-success form-control" style={{ width: "200px", marginLeft: "30px" }} onClick={saveChanges} >Save Changes</div>
                    </div>
                    <label className="m-0">Description</label>
                    <textarea type="text" className="form-control" value={description} placeholder="(Optional)" onChange={handleDescriptionChange} />
                    <div className="d-flex justify-content-between">
                        <div className="w-100">
                            <label className="m-0">Select Product</label>
                            <select className="form-select" onChange={handleProductChange}>
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
                    <label className="m-0">Value</label>
                    <input type="text" className="form-control" value={money} onChange={handleMoneyChange} />
                </div>
                <div style={{marginLeft: "60px"}} className="col-md-4 text-start">
                    <label className="m-0">Set Dates</label>
                    <div className="d-flex">
                        <input type="date" className="form-control" value={startDate} onChange={handleStartDateChange} />
                        <input type="date" className="form-control mx-2" value={endDate} onChange={handleEndDateChange} />
                    </div>
                </div>
            </div>
        </div>
    )
}