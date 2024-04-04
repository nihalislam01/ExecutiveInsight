import { useEffect } from "react";
import { useAuth } from "../../../security/AuthContext";

import CreateWorkspaceComponent from "./CreateWorkspaceComponent";
import PaymentForm from "./PaymentForm";
import { useNavigate } from "react-router-dom";

export default function WorkspaceComponent() {

    const authContext = useAuth();
    const navigate = useNavigate()
    const isAdmin = authContext.isAdmin();
    const isConsumer = authContext.isConsumer();

    useEffect(()=>{
        if(isAdmin) {
            navigate('/dashboard')
        }
    },[isAdmin, navigate])

    return (
        <div className="WorkspaceComponent">
            {!isConsumer && !isAdmin &&
                <PaymentForm />
            }
            {isConsumer && !isAdmin &&
                <CreateWorkspaceComponent />
            }
        </div>
    )
}