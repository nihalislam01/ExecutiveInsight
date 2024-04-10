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
    const [badge, setBadge] = useState([]);
    const [user, setUser] = useState('');

    const navigate = useNavigate();
    const authContext = useAuth();
    const username = authContext.username();

    useEffect(() => {
        authContext.refresh()
        const getInfo = async () => {
            await retrieveUserApi(username)
                .then((response) => {
                    setUser(response.data)
                    setBadge(response.data.badge)
                })
                .catch((error) => navigate('/error'));

            await retrieveWorkspacesByUserApi(username)
                .then((response) => {
                    setWorkspaces(response.data)
                    setHasWorkspaces(response.data.length > 0)
                })
                .catch((error) => navigate('/error'))
        }

        getInfo();
        
    }, [authContext, navigate, username])

    return (
        <div className="container mt-4">
            <Row>
                <Col xs={3} className="text-start">
                    <ProfilePhotoComponent user={user} />
                    <Link className="btn btn-outline-secondary form-control mb-4 mt-2" to={'/user-profile/edit'}>Edit Profile</Link>
                    <ProfileInfoComponent user={user} />
                </Col>
                <Col xs={9}>
                    <ProfileBadgeComponent badge={badge} />
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