import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { retrieveUserApi, retrieveWorkspacesByUserApi } from "./api/ExecutiveInsightApiService";
import { useAuth } from './security/AuthContext';
import { Col, Image, Row } from "react-bootstrap";
import profileImage from "./styles/executive-insight-blank-user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import UserProfileWorkspaceComponent from "./UserProfileWorkspaceComponent";

export default function UserProfileComponent() {

    const [workspaces, setWorkspaces] = useState([{}]);
    const [hasWorkspaces, setHasWorkspaces] = useState(false)
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [circumference, setCircumference] = useState(3);
    const [points, setPoints] = useState(0);
    const [image, setImage] = useState('');
    const [location, setLocation] = useState('');

    const navigate = useNavigate();
    const authContext = useAuth();
    const username = authContext.username();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh()
        retrieveUserApi(username)
            .then((response) => {
                setUserName(response.data.name)
                if (response.data.bio!==null) {
                    setBio(response.data.bio);
                }
                if (response.data.location!==null) {
                    setLocation(response.data.location);
                }
                if (response.data.image!==null) {
                    setImage(response.data.image);
                }
            })
            .catch((error) => navigate('/error'));

        retrieveWorkspacesByUserApi(username)
            .then((response) => {
                setWorkspaces(response.data)
                setHasWorkspaces(response.data.length > 0)
            })
            .catch((error) => navigate('/error'))
    }
  
    const calculateArcLength = () => {
      if (points===circumference) {
        setCircumference(circumference*2);
      }
      const arcLength = (points / circumference) * (2 * Math.PI * 50);
      return arcLength;
    };

    return (
        <div className="UserProfileComponent">
            <div className="container">
                <Row>
                    <Col xs={3} className="text-start">
                        {image==='' && <Image src={profileImage} alt="Profile" roundedCircle style={{ width: '250px', height: '250px' }} className="mb-4"  />}
                        {image!=='' && <Image src={image} alt="Profile" roundedCircle style={{ width: '250px', height: '250px' }} className="mb-4"  />}
                        <h2 className="mb-2">{userName}</h2>
                        {bio!=='' &&
                            <p>{bio}</p>
                        }
                        <Link className="btn btn-outline-secondary form-control mb-4 mt-2" to={'/user-profile/edit'}>Edit Profile</Link>
                        <Row>
                            <Col xs={1}><FontAwesomeIcon icon={faEnvelope} /></Col>
                            <Col xs={11}><p>{username}</p></Col> 
                        </Row>
                        {location!=='' &&
                            <Row>
                                <Col xs={1}><FontAwesomeIcon icon={faLocationDot} /></Col>
                                <Col xs={11}><p>{location}</p></Col> 
                            </Row>
                        }
                    </Col>
                    <Col xs={9}>
                        <Row className="mb-4">
                            <Col className="mx-2" style={{ backgroundColor: "#e9ecef", borderRadius: "8px" }}>
                                <p>{points}/{circumference}</p>
                                <svg width="200" height="200">
                                    <circle cx="100" cy="100" r="50" fill="transparent" stroke="#ced4da" strokeWidth="3" />
                                    <circle
                                    cx="100"
                                    cy="100"
                                    r="50"
                                    fill="transparent"
                                    stroke="#8da9c4"
                                    strokeWidth="5"
                                    strokeDasharray={`${calculateArcLength()} ${2 * Math.PI * 50}`}
                                    transform="rotate(-90 100 100)"
                                    strokeLinecap="round" />
                                </svg>
                            </Col>
                            <Col className="mx-2" style={{ backgroundColor: "#e9ecef", borderRadius: "8px" }}>
                                <h6 className="mx-2 mt-4">Top Badge</h6>
                            </Col>
                        </Row>
                        <hr />
                        <h5 className="text-start my-4">Workspaces I have joined</h5>
                        <div className="row g-3">
                            {hasWorkspaces &&
                                workspaces.map(
                                    workspace => (
                                        <UserProfileWorkspaceComponent workspace={workspace} key={workspace.workspaceId} />
                                    )
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}