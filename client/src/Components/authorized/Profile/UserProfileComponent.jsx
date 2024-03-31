import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import { retrieveUserApi, retrieveWorkspacesByUserApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from '../../../security/AuthContext';

import UserProfileWorkspaceComponent from "./UserProfileWorkspaceComponent";
import ProfilePhotoComponent from "./ProfilePhotoComponent";
import ProfileInfoComponent from "./ProfileInfoComponent";
import ProfileBadgeComponent from "./ProfileBadgeComponent";

export default function UserProfileComponent() {

    const [workspaces, setWorkspaces] = useState([{}]);
    const [hasWorkspaces, setHasWorkspaces] = useState(false)
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [points, setPoints] = useState(0);
    const [image, setImage] = useState('');
    const [location, setLocation] = useState('');

    const navigate = useNavigate();
    const authContext = useAuth();
    const username = authContext.username();

    useEffect(() => {
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
    }, [authContext, navigate, username])

    return (
        <div className="container">
            <Row>
                <Col xs={3} className="text-start">
                    <ProfilePhotoComponent image={image} userName={userName} bio={bio} />
                    <Link className="btn btn-outline-secondary form-control mb-4 mt-2" to={'/user-profile/edit'}>Edit Profile</Link>
                    <ProfileInfoComponent username={username} location={location} />
                </Col>
                <Col xs={9}>
                    <ProfileBadgeComponent points={points} />
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
    )
}