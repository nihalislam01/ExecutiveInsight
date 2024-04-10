import { useEffect } from "react";
import { useAuth } from "../../../security/AuthContext";

import CreateWorkspaceComponent from "./CreateWorkspaceComponent";
import PaymentForm from "./PaymentForm";
import { useNavigate } from "react-router-dom";
import { retrieveUserApi } from "../../../api/ExecutiveInsightApiService";

export default function WorkspaceComponent() {

    const authContext = useAuth();
    const navigate = useNavigate()
    const email = authContext.username();
    const isAdmin = authContext.isAdmin();
    const isConsumer = authContext.isConsumer();

    useEffect(()=>{
        if(isAdmin) {
            retrieveUserApi(email)
                .then((response)=>navigate(`/dashboard/${response.data.workspace.workspaceId}`))
                .catch((error)=>navigate('/error'))
        }
    },[isAdmin, email, navigate])

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