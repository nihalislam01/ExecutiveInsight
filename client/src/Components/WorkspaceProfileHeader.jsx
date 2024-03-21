import { Link } from "react-router-dom";
import './styles/WorkspaceProfileComponent.css';

export default function WorkspaceProfileHeaderComponent() {
    return (
        <div className="nav py-3 px-3 mb-3 border-bottom border-light border-5">
            <p className="option">Teams</p>
            <p className="option">Orders</p>
            <p className="option">Deliveries</p>
        </div>
    )
}