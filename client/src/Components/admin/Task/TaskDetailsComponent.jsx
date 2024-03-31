import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function TaskDetailsComponent(props) {

    const navigate = useNavigate();

    const setEdit = () => {
        props.setIsEdit(true);
    }

    const goToProfile = () => {
        navigate(`/user/${props.task.user.userId}`)
    }


    return (
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-10">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <h5>{props.task.name}</h5>
                        <FontAwesomeIcon icon={faPenToSquare} className="mx-2 pb-3 btn" onClick={setEdit} />
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-6 text-start">
                            {props.task.description!=='' && 
                                <div>
                                    <p>Description</p>
                                    <p className="form-control  border-0 shadow">{props.task.description}</p>
                                </div>
                            }
                            <p>Product</p>
                            <div className="d-flex">
                                {props.task.product===null && <p className="form-control  border-0 shadow">Product Unavailable</p>}
                                {props.task.product!==null && <p className="form-control  border-0 shadow">{props.productName}</p>}
                                <p className="form-control  border-0 shadow" style={{width: "40px", marginLeft: "20px"}}>{props.task.quantity}</p>
                            </div>
                            <p>Value</p>
                            <p className="form-control  border-0 shadow">{props.task.money}</p>
                            {!props.task.assigned &&
                                <p>Task has not been assigned yet</p>
                            }
                            {props.task.assigned && props.task.user!==null &&
                                <div>
                                <h5>Task Assigned to</h5>
                                <hr />
                                <button className="btn btn-light form-control text-start  border-0 shadow" onClick={goToProfile}>{props.task.user.name}</button>
                                </div>
                            }
                            {props.task.assigned && props.task.team!==null &&
                                <div>
                                <h5>Task Assigned to</h5>
                                <hr />
                                <button className="btn btn-light form-control text-start  border-0 shadow">{props.task.team.name}</button>
                                </div>
                            }
                        </div>
                        <div className="col-md-6">
                            <p>Status</p>
                            <div className="d-flex text-start">
                                <p className="form-control  border-0 shadow"><FontAwesomeIcon icon={faCalendarDays} className="mx-2" />{props.task.startDate}</p>
                                <p className="form-control  border-0 shadow" style={{marginLeft: "5px"}}><FontAwesomeIcon icon={faCalendarDays} className="mx-2" />{props.task.endDate}</p>
                                <p className="form-control  border-0 shadow" style={{marginLeft: "5px"}}>{props.task.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}