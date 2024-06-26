import { useEffect, useRef, useState } from "react"
import { retrieveUserApi } from "../../api/ExecutiveInsightApiService"
import { useAuth } from "../../security/AuthContext"
import ProfileImage from '../../assets/executive-insight-blank-user.png';
import '../../styles/SidebarComponent.css'
import { Image } from "react-bootstrap";
import { faBarsProgress, faBriefcase, faCreditCard, faLaptopFile, faRightFromBracket, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function OptionsComponent(props) {

    const authContext = useAuth();
    const email = authContext.username();
    const isConsumer = authContext.isConsumer();
    const isAdmin = authContext.isAdmin();
    const [user, setUser] = useState([]);
    const [id, setId] = useState(0);
    const optionRef = useRef(null);
    const [image, setImage] = useState('');

    useEffect(()=>{
        authContext.refresh()
        const getUser = async () => {
            await retrieveUserApi(email)
                .then((response)=>{
                    setUser(response.data)
                    setImage(response.data.image)
                    if (response.data.workspace!=null) {
                        setId(response.data.workspace.workspaceId)
                    }
                })
                .catch((error)=>console.log(error))
        }

        getUser();

        const observer = new IntersectionObserver((entries)=> {
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    entry.target.classList.add('sidebar-show')
                } else {
                    entry.target.classList.remove('sidebar-show')
                }
            })
        })
    
        const hiddenElement = document.querySelectorAll('.sidebar-hidden')
        hiddenElement.forEach((element) => observer.observe(element))

        const handleClickOutside = (event) => {
            if (optionRef.current && !optionRef.current.contains(event.target)) {
                props.setShowOptions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
                document.removeEventListener('mousedown', handleClickOutside);
        };

    },[authContext, email, props])

    const logout = () => {
        props.setShowOptions(false);
        authContext.logout();
    }

    const cancelPremium = () => {
        props.setShowCancelForm(true);
        props.setShowOptions(false);
    }

    return (
        <div>
            <div ref={optionRef}>
                <div className="position-fixed shadow z-2 p-4 text-start sidebar-hidden" style={{ height: "100vh", width: "300px", right: "0px", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", backgroundColor: "white" }}>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                        {user.image===null && <Image src={ProfileImage} alt="Profile" roundedCircle style={{ width: '40px', height: '40px' }} className='mx-2' />}
                        {user.image!==null && <Image src={`data:image/png;base64,${image}`} alt="Profile" roundedCircle style={{ width: '40px', height: '40px' }} className='mx-2' />}
                        <h6 className="pt-2">{user.name}</h6>
                        </div>
                        <button className="btn" onClick={() => props.setShowOptions(false)}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                    <hr />
                    <Link className="nav-link my-2 mx-2 link" to="/user-profile" onClick={() => props.setShowOptions(false)}><FontAwesomeIcon icon={faUser} className="mx-2" />Your Profile</Link>
                    {isAdmin && <Link className="nav-link my-2 mx-2 link" to={`/dashboard/${id}`} onClick={() => props.setShowOptions(false)}><FontAwesomeIcon icon={faBriefcase} className="mx-2" />Your Workspace</Link>}
                    {!isAdmin && <Link className="nav-link my-2 mx-2 link" to="/my-workspace" onClick={() => props.setShowOptions(false)}><FontAwesomeIcon icon={faBriefcase} className="mx-2" />Your Workspace</Link>}
                    <hr />
                    <Link className="nav-link my-2 mx-2 link" to={`/my-tasks/${user.userId}`} onClick={() => props.setShowOptions(false)}><FontAwesomeIcon icon={faBarsProgress} className="mx-2" />Your Tasks</Link>
                    <Link className="nav-link my-2 mx-2 link" to="/home" onClick={() => props.setShowOptions(false)}><FontAwesomeIcon icon={faLaptopFile} className="mx-2" />Joined Worksapces</Link>
                    {(isConsumer || isAdmin) && <Link className="nav-link my-2 mx-2 link" onClick={cancelPremium}><FontAwesomeIcon icon={faCreditCard} className="mx-2" />Cancel Premium</Link>}
                    <hr />
                    <Link className="nav-link my-2 mx-2 link" to="/logout" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} className="mx-2" />Sign out</Link>
                </div>
            </div>
        </div>
    )
}