import { useState } from "react";
import CreateWorkspaceFormComponent from "./CreateWorkspaceFormComponent";

export default function CreateWorkspaceComponent() {

    const [show, setShow] = useState(false);

    return (
        <div>
            {show &&
                <CreateWorkspaceFormComponent setShow={setShow} />
            }
            <div className="row p-5 m-5 bg-light">
                <h2 className="col-md-6 text-start">Start your business journey by creating your own workspace</h2>
                <div className="col-md-6"><button className="btn btn-link" onClick={() => setShow(true)}>Create Your Workspace</button></div>
            </div>
            <div className="row p-5 m-5 bg-light text-start">
                <h5>Empower your enterprise with our comprehensive business management solutions</h5>
                <ul>
                    <li>Manage your teams</li>
                    <li>Monitor your company revenue</li>
                    <li>Monitor your employee progress</li>
                </ul>
            </div>
        </div>
    )
}