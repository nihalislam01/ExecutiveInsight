import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faMinus, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { editTaskApi, retrieveProductsApi, retrieveTaskApi } from "../../api/ExecutiveInsightApiService";
import { useAuth } from "../../security/AuthContext";

export default function TaskProfileComponent() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [productName, setProductName] = useState('');
    const [status, setStatus] = useState('');
    const [quantity, setQuantity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isAssigned, setAssigned] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [hasProducts, setHasProducts] = useState(false);
    const [products, setProducts] = useState([{}]);
    const [productId, setProductId] = useState(0);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(0);
    const [teamName, setTeamName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('success');
    const [message, setMessage] = useState('');

    const { workspaceId, id } = useParams();
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        authContext.refresh()
        retrieveTaskApi(id)
            .then((response) => {
                setName(response.data.name)
                setDescription(response.data.description)
                if (response.data.product!==null) {
                    setProductName(response.data.product.name)
                    setProductId(response.data.product.productId)
                }
                setStatus(response.data.status)
                setQuantity(response.data.quantity)
                setStartDate(response.data.startDate)
                setEndDate(response.data.endDate)
                setAssigned(response.data.assigned)
                if (response.data.assigned) {
                    if (response.data.user!==null) {
                        setUserName(response.data.user.name)
                        setUserId(response.data.user.userId)
                    } else {
                        setTeamName(response.data.team.name)
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                navigate('/error')})
    }, [authContext, id, navigate])

    function setEdit() {
        retrieveProductsApi(workspaceId)
        .then((response) => {
            setHasProducts(response.data.length > 0)
            setProducts(response.data)
            if (response.data.length > 0 && productId===0) {
                setProductId(response.data[0].productId)
            }
        })
        setIsEdit(true);
    }

    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    function handleProduct(event) {
        setProductId(event.target.value)
    }

    function handleQuantityChange(event) {
        setQuantity(event.target.value)
    }

    function handlePlus() {
        let n = parseInt(quantity);
        n += 1;
        setQuantity(n.toString());
    }

    function handleMinus() {
        let n = parseInt(quantity);
        if (n>1) {
            n -= 1;
            setQuantity(n.toString());
        }
    }

    function handleStartDateChange(event) {
        setStartDate(event.target.value)
    }

    function handleEndDateChange(event) {
        setEndDate(event.target.value)
    }

    function saveChanges() {
        const theTask = {
            productId: productId,
            taskId: id,
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
            quantity: quantity
        }
        editTaskApi(theTask)
            .then((response) => window.location.href = `/task/${workspaceId}/${id}`)
            .catch((error) => {
                setAlertColor('danger');
                setMessage(error.response.data);
                setShowAlert(true)
            })
    }

    function goToProfile() {
        navigate(`/user/${userId}`)
    }

    return (
        <Row>
            <Col xs={2}></Col>
            <Col xs={5} className="text-start" style={{marginLeft: "20px"}}>
            {showAlert && <div className={`alert alert-${alertColor} shadow`}>{message}</div>}
                {!isEdit &&
                    <div>
                        <div className="d-flex align-items-center">
                            <h5>{name}</h5>
                            <FontAwesomeIcon icon={faPenToSquare} className="mx-2 pb-3 btn" onClick={setEdit} />
                        </div>
                        <hr />
                    </div>
                }
                {isEdit &&
                    <div>
                        <label className="m-0">Task Name</label>
                        <div className="d-flex align-items-center">
                            <input type="text" className="form-control" value={name} onChange={handleNameChange} />
                            <div className="btn btn-success form-control" style={{ width: "200px", marginLeft: "30px" }} onClick={saveChanges} >Save Changes</div>
                        </div>
                    </div>
                }
                {!isEdit &&
                    <div>
                        {description!=='' && 
                            <div>
                                <p>Description</p>
                                <p className="form-control">{description}</p>
                            </div>
                        }
                    </div>
                }
                {isEdit &&
                    <div>
                        <label className="m-0">Description</label>
                        <textarea type="text" className="form-control" value={description} placeholder="(Optional)" onChange={handleDescriptionChange} />
                    </div>
                }
                {!isEdit && 
                <div>
                    <p>Product</p>
                    <div className="d-flex">
                        {productName==='' && <p className="form-control">Product Unavailable</p>}
                        {productName!=='' && <p className="form-control">{productName}</p>}
                        <p className="form-control" style={{width: "40px", marginLeft: "20px"}}>{quantity}</p>
                    </div>
                </div>
                }
                {isEdit &&
                    <div className="d-flex justify-content-between">
                        <div className="w-100">
                            <label className="m-0">Select Product</label>
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
                }
                {!isAssigned && !isEdit &&
                    <p>Task has not been assigned yet</p>
                }
                {isAssigned && !isEdit && userName!=='' &&
                    <div>
                    <h5>Task Assigned to</h5>
                    <hr />
                    <button className="btn btn-light form-control text-start" onClick={goToProfile}>{userName}</button>
                    </div>
                }
                {isAssigned && !isEdit && teamName!=='' &&
                    <div>
                    <h5>Task Assigned to</h5>
                    <hr />
                    <button className="btn btn-light form-control text-start">Team {teamName}</button>
                    </div>
                }
            </Col>
            {!isEdit &&
                <Col xs={4} style={{marginLeft: "60px", marginTop: "38px"}}>
                    <p>Status</p>
                    <div className="d-flex text-start">
                        <p className="form-control"><FontAwesomeIcon icon={faCalendarDays} className="mx-2" />{startDate}</p>
                        <p className="form-control" style={{marginLeft: "5px"}}><FontAwesomeIcon icon={faCalendarDays} className="mx-2" />{endDate}</p>
                        <p className="form-control" style={{marginLeft: "5px"}}>{status}</p>
                    </div>
                </Col>
            }
            {isEdit && 
                <Col xs={4} style={{marginLeft: "60px"}} className="text-start">
                    <label className="m-0">Set Dates</label>
                    <div className="d-flex">
                        <input type="date" className="form-control" value={startDate} onChange={handleStartDateChange} />
                        <input type="date" className="form-control mx-2" value={endDate} onChange={handleEndDateChange} />
                    </div>
                </Col>
            }
        </Row>
    )
}