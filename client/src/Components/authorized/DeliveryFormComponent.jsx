import { useEffect, useState } from "react"
import { createDeliveryApi } from "../../api/ExecutiveInsightApiService";

export default function DeliveryFormComponent(props) {

    const [description, setDescription] = useState('');
    const [receipt, setReceipt] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (props.formRef.current && !props.formRef.current.contains(event.target)) {
              props.setShowForm(false);
            }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [props])

    const handleDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleReceipt = (event) => {
        setReceipt(event.target.value)
    }

    const handleSubmit = async () => {
        const delivery = {
            description: description,
            receipt: receipt,
            taskId: props.taskId,
            workspaceId: props.wId
        }
        await createDeliveryApi(delivery)
            .then((response)=>props.setSuccess())
            .catch((error)=>props.setError())
    }

    return (
        <div className='d-flex justify-content-center position-fixed z-1' style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} ref={props.formRef} >
            <div style={{width: "600px"}}>
                <div className="card shadow">
                    <div className="card-header">Create Delivery</div>
                    <div className="card-body text-start">
                        <label>Description</label>
                        <textarea type="text" className="form-control" value={description} onChange={handleDescription} />
                        <label>Reference/Receipt</label>
                        <input type="text" className="form-control" value={receipt} onChange={handleReceipt} />
                        <button className="button-02 mt-4" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}