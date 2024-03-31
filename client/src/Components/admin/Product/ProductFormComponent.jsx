import { useEffect, useRef, useState } from "react";

import { createProductApi, changeProductNameApi } from "../../../api/ExecutiveInsightApiService";

export default function ProductFormComponent(props) {

    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState('success');
    const [message, setMessage] = useState('');
    const [productName, setProductName] = useState('');

    const formRef = useRef(null);

    useEffect(() => {
        if (props.product!==null) {
            setProductName(props.product.name)
        }
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
              props.setShow(false);
            }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [props])

    const handleNameChange = (event) => {
        setProductName(event.target.value);
    }

    const setNotShow = () => {
        props.setShow(false);
        setShowAlert(false);
    }

    const addProduct = () => {
        const theProduct = {
            id: props.id,
            name: productName
        }
        createProductApi(theProduct)
            .then((response) => {
                window.location.href = `/products/${props.id}`;
            })
            .catch((error) => {
                setAlertColor('danger');
                setMessage(error.response.data);
                setShowAlert(true)
            })
    }

    const changeProduct = () => {
        const theProduct = {
            id: props.product.productId,
            name: productName
        }
        changeProductNameApi(theProduct)
            .then((response) => window.location.href = `/products/${props.id}`)
            .catch((error) => {
                setAlertColor('danger');
                setMessage(error.response.data);
                setShowAlert(true)
            })
    }

    return (
        <div className='justify-content-center position-fixed z-1' style={{ width: "600px", top: "200px", left: "500px" }} ref={formRef}>
                {showAlert && <div className={`alert alert-${alertColor} shadow`}>{message}</div>}
                <div className="card shadow">
                    <div className="card-header text-center p-3">
                        {props.isEdit && <h5>Change product name</h5>}
                        {!props.isEdit && <h5>Add new product for your workspace</h5>}
                    </div>
                    <div className="card-body text-start">
                        <form>
                            <div className="form-group">
                                <label className="col-form-label m-0">product Name</label>
                                <input type="text" className="form-control" value={productName} onChange={handleNameChange} />
                            </div>
                        </form>
                        <hr />
                        <div className="text-end">
                            <button type="button" className="btn btn-secondary mx-2" onClick={setNotShow}>Close</button>
                            {!props.isEdit && <button type="button" className="btn btn-primary" onClick={addProduct}>Add</button>}
                            {props.isEdit && <button type="button" className="btn btn-success" onClick={changeProduct}>Change</button>}
                        </div>
                    </div>
                </div>
        </div>
    )
}