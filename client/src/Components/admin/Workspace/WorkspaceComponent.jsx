import { useAuth } from "../../../security/AuthContext";

import NoWorkspaceComponent from './NoWorkspaceComponent';

export default function WorkspaceComponent() {

    const authContext = useAuth();
    const hasWorkspace = authContext.hasWorkspace();

    return (
        <div className="WorkspaceComponent">
            {!hasWorkspace &&
                <NoWorkspaceComponent />
            }

            {hasWorkspace &&
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-10">
                        <h1 className="text-start px-4">Name</h1>
                    </div>
                </div>
            }
        </div>
    )
}