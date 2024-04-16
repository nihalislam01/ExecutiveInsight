import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { retrieveAttendancesApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

export default function ListAttendance() {

    const [allAttendances, setAllAttendances] = useState([]);
    const [attendances, setAttendances] = useState([]);
    const [day, setDay] = useState('');
    const {id} = useParams();
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{

        authContext.refresh();

        const getAttendances = async () => {
            await retrieveAttendancesApi(id)
                .then((response)=>{
                    const datas = response.data;
                    const now = new Date().toISOString().slice(0, 10);
                    setDay(now);
                    const filtered = datas.filter(data=>data.date === now);
                    setAttendances(filtered);
                    setAllAttendances(response.data);
                })
                .catch((error)=>navigate('/error'))
        }

        getAttendances();

    },[authContext, id, navigate])

    const handleDateChange = (event) => {
        setDay(event.target.value)
        const filtered = allAttendances.filter(data=>data.date === event.target.value);
        setAttendances(filtered);
    }

    return (
        <div className="background-13 w-100 p-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Attendance</h2>
                <div className="d-flex align-items-center">
                    <input type="date" value={day} className="form-control" onChange={handleDateChange} />
                </div>
            </div>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Is Attended</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attendances.map((attendance,index)=>(
                            <tr key={index}>
                                <td>{attendance.user.name}</td>
                                {attendance.checkInTime===null && <td>N/A</td>}
                                {attendance.checkInTime!==null && <td>{attendance.checkInTime}</td>}
                                {attendance.checkOutTime===null && <td>N/A</td>}
                                {attendance.checkOutTime!==null && <td>{attendance.checkOutTime}</td>}
                                {attendance.attended && <td><FontAwesomeIcon icon={faCheck} style={{color: "#8ac926"}} /></td>}
                                {!attendance.attended && <td><FontAwesomeIcon icon={faXmark} /></td>}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}