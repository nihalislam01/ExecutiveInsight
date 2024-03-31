import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeUserFromTeamApi, retrieveTeamUserApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

import '../../../styles/ListComponent.css';

export default function TeamMembersComponent(props) {

    const [hasMembers, setHasMembers] = useState(false);
    const [members, setMembers] = useState([{}]);

    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        authContext.refresh();
        const getUsers = async () => {
            await retrieveTeamUserApi(props.id)
                .then((response)=>{
                    setHasMembers(response.data.length > 0)
                    setMembers(response.data)
                })
                .catch((error)=>navigate('/error'))
        }
        getUsers();
    },[authContext, props.id, navigate])

    const viewProfile = (id) => {
        navigate(`/user/${id}`)
    }

    const removeUser = async (email) => {
        await removeUserFromTeamApi(email, props.id)
            .then((response)=>toast.success("User successfully removed"))
            .catch((error)=> {
                console.log(error);
                toast.error("Something went wrong");
            })
    }

    return (
        <div className="container">
            <Toaster />
            {!hasMembers && <h5>No members on team yet</h5>}
            {hasMembers && 
                <div>
                    <h2 className="text-start">Members</h2>
                    <hr />
                </div>
            }
            {hasMembers &&
                members.map(
                    member => (
                        <div className="d-flex justify-content-between align-items-center mb-3" key={member.userId}>
                            <div className="w-100 px-4 py-2 text-start create" onClick={() => viewProfile(member.userId)} style={{fontSize: "25px", borderTopRightRadius: "0", borderBottomRightRadius: "0"}}>
                                {member.name}
                            </div>
                            <div className="px-3 create" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", paddingTop: "15px", paddingBottom: "15px" }} onClick={() => removeUser(member.email)}><FontAwesomeIcon icon={faUserMinus} /></div>
                        </div>
                    )
                )
            }
        </div>
    )
}