import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";

import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeUserFromTeamApi, retrieveTeamUserApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

import '../../../styles/ListComponent.css';
import profileImage from '../../../assets/executive-insight-blank-user.png';

export default function TeamMembersComponent(props) {

    const [hasMembers, setHasMembers] = useState(false);
    const [members, setMembers] = useState([{}]);

    const authContext = useAuth();
    const navigate = useNavigate();
    const isMine = authContext.isMine(props.wId);

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
                            <div className="d-flex w-100 py-2 text-start create" onClick={() => viewProfile(member.userId)} style={{fontSize: "25px", borderTopRightRadius: "0", borderBottomRightRadius: "0"}}>
                                {member.image===null && <Image src={profileImage} alt="Profile" roundedCircle style={{ width: '40px', height: '40px' }} className='mx-2' />}
                                {member.image!==null && <Image src={member.image} alt="Profile" roundedCircle style={{ width: '40px', height: '40px' }} className='mx-2' />}
                                <p className="m-0">{member.name}</p>
                            </div>
                            {isMine && <div className="px-3 create" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", paddingTop: "16px", paddingBottom: "16px" }} onClick={() => removeUser(member.email)}><FontAwesomeIcon icon={faUserMinus} /></div>}
                        </div>
                    )
                )
            }
        </div>
    )
}