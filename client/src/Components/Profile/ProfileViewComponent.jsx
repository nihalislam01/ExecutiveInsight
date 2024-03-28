import { useState } from "react";
import { useEffect } from "react"
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"
import { retrieveUserByIdApi, retrieveWorkspacesByUserForViewApi } from "../api/ExecutiveInsightApiService";
import { useAuth } from "../security/AuthContext"
import ProfilePhotoComponent from "./ProfilePhotoComponent";
import ProfileInfoComponent from "./ProfileInfoComponent";
import ProfileBadgeComponent from "./ProfileBadgeComponent";

export default function ProfileViewComponent() {

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [points, setPoints] = useState(0);
    const [workspaces, setWorkspaces] = useState([{}]);
    const [hasWorkspaces, setHasWorkspaces] = useState(false)

    const {id} = useParams()
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh()
        retrieveUserByIdApi(id)
            .then((response) => {
                setName(response.data.name)
                setEmail(response.data.email)
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
            .catch((error) => navigate('/error'))
        retrieveWorkspacesByUserForViewApi(id)
            .then((response) => {
                setWorkspaces(response.data)
                setHasWorkspaces(response.data.length > 0)
                console.log(response)
            })
            .catch((error) => navigate('/error'))
    }

    return (
        <div className="container">
            <Row>
                <Col xs={3} className="text-start">
                    <ProfilePhotoComponent image={image} userName={name} bio={bio} />
                    <ProfileInfoComponent username={email} location={location} />
                </Col>
                <Col xs={9}>
                    <ProfileBadgeComponent points={points} />
                    <hr />
                    {hasWorkspaces &&
                        <div>
                            <h5 className="text-start my-4">Currently Working</h5>
                            {
                                workspaces.map(
                                    workspace => (
                                        <div className="form-control text-start mb-2" style={{ backgroundColor: "#e9ecef" }} key={workspace.workspace.workspaceId}>
                                            <h5 className="m-0">{workspace.workspace.name}</h5>
                                            {workspace.post!==null &&
                                                <p className="m-0">Working as {workspace.post.title}</p>
                                            }
                                            {workspace.post===null &&
                                                <p className="m-0">Hasn't assigned to a post yet</p>
                                            }
                                        </div>
                                    )
                                )
                            }
                        </div>
                    }
                </Col>
            </Row>
        </div>    
    )
}