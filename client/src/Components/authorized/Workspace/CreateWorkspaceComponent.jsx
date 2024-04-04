import '../../../styles/PlanComponent.css'
import { useState } from 'react'
import WorkspaceFormComponent from './WorkspaceFormComponent';
import toast, { Toaster } from 'react-hot-toast';

export default function CreateWorkspaceComponent() {

    const [showForm, setShowForm] = useState(false);

    const setSuccess = () => {
        setShowForm(false);
        toast.success("Workspace created");
    }

    const setError = () => {
        setShowForm(false);
        toast.error("Error creating workspace");
    }

    return (
        <div className='container mt-4 primary-background'>
            <Toaster />
            {showForm && <WorkspaceFormComponent setShow={setShowForm} setSuccess={setSuccess} setError={setError} />}
            <div className='text-end'>
                <button className='button' onClick={() => setShowForm(true)}>Create Workspace</button>
                <h2 className='mt-5'>Manage your startup by creating your own workspace</h2>
                <h5>You are a premium member now</h5>
            </div>
            <div className='d-flex' style={{marginTop: "230px", marginLeft: "100px"}}>
                <div className='text-start'>
                    <h6>Manage members</h6>
                    <h6>Manage Teams</h6>
                    <h6>Manage Posts</h6>
                    <h6>Manage Tasks</h6>
                </div>
                <div className='text-start mx-5'>
                    <h6>Manage Products</h6>
                    <h6>Manage Deliveries</h6>
                    <h6>Monitor Company Revenue</h6>
                    <h6>Monitor Member Progress</h6>
                </div>
            </div>
        </div>
    )
}