import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { retrieveTeamUserApi } from "../../api/ExecutiveInsightApiService";
import { useAuth } from "../../security/AuthContext";
import '../../styles/ListComponent.css';

export default function TeamMembersComponent(props) {

    const [hasMembers, setHasMembers] = useState(false);
    const [members, setMembers] = useState([{}]);

    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        authContext.refresh();
        retrieveTeamUserApi(props.id)
            .then((response)=>{
                setHasMembers(response.data.length > 0)
                setMembers(response.data)
            })
            .catch((error)=>navigate('/error'))
    },[authContext, props.id, navigate])

    const viewProfile = (id) => {
        navigate(`/user/${id}`)
    }

    return (
        <div className="container">
            <table className="table">
                <tbody>
                    {hasMembers &&
                        members.map(
                            member => (
                                <div className="d-flex justify-content-between px-2">
                                    <div className="w-100 px-4 text-start mb-3 create" onClick={() => viewProfile(member.userId)} style={{fontSize: "25px", borderTopRightRadius: "0", borderBottomRightRadius: "0", backgroundColor: "#f2f2f2"}}>
                                        {member.name}
                                    </div>
                                    <div className="pt-3 mb-3 create" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", backgroundColor: "#f2f2f2" }}><FontAwesomeIcon icon={faUserMinus} /></div>
                                </div>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}