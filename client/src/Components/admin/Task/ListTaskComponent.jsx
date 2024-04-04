import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { retrieveTasksApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

import '../../../styles/ListComponent.css'

import SingleTaskComponent from "./SingleTaskComponent";
import AddTaskComponent from "./AddTaskComponent";
export default function ListTaskComponent() {

    const [hasTasks, setHasTasks] = useState(false);
    const [tasks, setTasks] = useState([{}]);
    const [show, setShow] = useState(false);
    const authContext = useAuth();
    const {id} = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([{}]);

    useEffect(() => {
        authContext.refresh()
        const getTasks = async () => {
            await retrieveTasksApi(id)
                .then((response) => {
                    setHasTasks(response.data.length > 0);
                    setTasks(response.data);
                    setFilteredTasks(response.data);
                })
                .catch((error) => {
                    console.log("Error fetching tasks: " + error)
                    navigate('/error')
                });
        }

        getTasks()

    }, [authContext, id, navigate])

    const showForm = () => {
        setShow(true);
    }
  
    const handleSearch = (event) => {
      const term = event.target.value;
      setSearch(term);
      const filtered = tasks.filter(task =>
        task.name.toLowerCase().includes(term.toLowerCase())
      );
      setHasTasks(filtered.length > 0);
      setFilteredTasks(filtered);
    }

    return (
        <div className="container w-100 mt-4">
            {show &&
                <AddTaskComponent setShow={setShow} id={id} />
            }
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="mx-3 text-start">Tasks</h2>
                <input placeholder="&#xf002; Search Task" value={search} style={{ fontFamily: 'Arial, FontAwesome', backgroundColor: "#f8f9fa" }} className="form-control w-50 text-center" onChange={handleSearch} />
                <div className="mx-5 create text-center" onClick={showForm} style={{ paddingLeft: "100px", paddingRight: "100px", paddingBottom: "10px", paddingTop: "10px" }}><FontAwesomeIcon icon={faPlus} /></div>
            </div>
            <hr />
            <table className='table'>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Value</th>
                        <th>Delivery</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {hasTasks &&
                        filteredTasks.map(
                            task => (
                                <SingleTaskComponent key={task.taskId} task={task} id={id} />
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}