import '../../../styles/ProfileHeaderComponent.css';
import {useAuth} from '../../../security/AuthContext';
import { useEffect } from 'react';
import { checkInApi, checkOutApi, retrieveAttendanceApi } from '../../../api/ExecutiveInsightApiService';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function WorkspaceProfileHeaderComponent(props) {

    const [checkedIn, setCheckedIn] = useState(false);
    const [checkedOut, setCheckedOut] = useState(false);
    const [userId, setId] = useState(0);
    const {id} = useParams();

    const authContext = useAuth();
    const email = authContext.username();
    const navigate = useNavigate();

    useEffect(()=>{
        authContext.refresh();

        const getInfo = async () => {
            await retrieveAttendanceApi(email, id)
                .then((response)=>{
                    if(response.data.checkInTime!==null) {
                        setCheckedIn(true);
                    }
                    if(response.data.checkOutTime!==null) {
                        setCheckedOut(true);
                    }
                    setId(response.data.attendanceId)
                })
                .catch((error)=>navigate('/error'))
        }

        getInfo();

    },[authContext, email, navigate, id])

    const showTeam = () => {
        props.setShowTeams(true);
        props.setShowTasks(false);
    }

    const showTask = () => {
        props.setShowTeams(false);
        props.setShowTasks(true);
    }

    const checkIn = async () => {
        await checkInApi(userId)
            .then((response)=>toast.success("Checked In"))
            .catch((error)=>toast.error("Error checking in"))
    }

    const checkOut = async () => {
        await checkOutApi(userId)
            .then((response)=>toast.success("Checked out"))
            .catch((error)=>toast.error("Error checking out"))
    }

    return (
        <div>
            <Toaster />
            <div className="py-4 px-3 border-bottom border-5 d-flex justify-content-between align-items-center">
                <div className='d-flex'>
                    <p className="option" onClick={showTeam}>Teams</p>
                    <p className="option" onClick={showTask}>Tasks</p>
                </div>
                <div>
                    {!checkedIn && !checkedOut && <button className='button-05' style={{width: "100px"}} onClick={checkIn}>Check In</button>}
                    {checkedIn && !checkedOut && <button className='button-07' style={{width: "100px"}} onClick={checkOut}>Check Out</button>}
                    {checkedIn && checkedOut && <p className='m-0 form-control' style={{width: "100px"}}>Checked</p>}
                </div>
            </div>
        </div>
    )
}