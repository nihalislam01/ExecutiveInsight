import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"

import { retrieveUserByIdApi, retrieveWorkspacesByUserForViewApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext"

import ProfilePhotoComponent from "./ProfilePhotoComponent";
import ProfileInfoComponent from "./ProfileInfoComponent";
import ProfileBadgeComponent from "./ProfileBadgeComponent";

export default function ProfileViewComponent() {

    const [user, setUser] = useState([]);
    const [badge, setBadge] = useState([]);
    const [workspaces, setWorkspaces] = useState([{}]);
    const [hasWorkspaces, setHasWorkspaces] = useState(false)

    const {id} = useParams()
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        authContext.refresh()
        retrieveUserByIdApi(id)
            .then((response) => {
                setUser(response.data)
                setBadge(response.data.badge)
            })
            .catch((error) => navigate('/error'))
        retrieveWorkspacesByUserForViewApi(id)
            .then((response) => {
                setWorkspaces(response.data)
                setHasWorkspaces(response.data.length > 0)
                console.log(response)
            })
            .catch((error) => navigate('/error'))
    }, [authContext, id, navigate])

    return (
        <div className="container mt-4">
            <Row>
                <Col xs={3} className="text-start">
                    <ProfilePhotoComponent user={user} />
                    <ProfileInfoComponent user={user} />
                </Col>
                <Col xs={9}>
                    <ProfileBadgeComponent badge={badge} />
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