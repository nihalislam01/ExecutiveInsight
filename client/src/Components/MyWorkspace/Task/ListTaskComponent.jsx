import { useEffect, useState } from "react"
import { useAuth } from "../../security/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { retrieveTasksApi } from "../../api/ExecutiveInsightApiService";
import TaskComponent from "./TaskComponent";
import AddTaskComponent from "./AddTaskComponent";
import '../../styles/ListComponent.css'

export default function ListTaskComponent() {

    const [hasTasks, setHasTasks] = useState(false);
    const [tasks, setTasks] = useState([{}]);
    const [show, setShow] = useState(false);
    const authContext = useAuth();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh()
        retrieveTasksApi(id)
            .then((response) => {
                setHasTasks(response.data.length > 0);
                setTasks(response.data);
            })
            .catch((error) => navigate(error));
        }

    function showForm() {
        setShow(true);
    }

    return (
        <div className="ListProductComponent">
            {show &&
                <AddTaskComponent setShow={setShow} id={id} />
            }
            <Row>
                <Col xs={2}></Col>
                <Col xs={10}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="mx-3 text-start">Tasks</h2>
                        <div className="mx-5 create text-center" onClick={showForm} style={{ paddingLeft: "100px", paddingRight: "100px", paddingBottom: "10px", paddingTop: "10px" }}><FontAwesomeIcon icon={faPlus} /></div>
                    </div>
                    <hr />
                    <table className='table'>
                        <thead>
                            <th>Task Name</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Delivery</th>
                        </thead>
                        <tbody>
                            {hasTasks &&
                                tasks.map(
                                    task => (
                                        <tr key={task.taskId}>
                                            <td>
                                                <TaskComponent task={task} id={id} />
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    )
}