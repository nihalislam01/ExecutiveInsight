import { useAuth } from "../../../security/AuthContext";

import CreateWorkspaceComponent from "./CreateWorkspaceComponent";
import PaymentForm from "./PaymentForm";

export default function WorkspaceComponent() {

    const authContext = useAuth();
    const isAdmin = authContext.isAdmin();
    const isConsumer = authContext.isConsumer();

    return (
        <div className="WorkspaceComponent">
            {!isConsumer && !isAdmin &&
                <PaymentForm />
            }
            {!isConsumer && isAdmin &&
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-10">
                        <h1 className="text-start px-4">Name</h1>
                    </div>
                </div>
            }
            {isConsumer && !isAdmin &&
                <CreateWorkspaceComponent />
            }
        </div>
    )
}