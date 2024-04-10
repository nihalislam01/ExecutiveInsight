import { useState, useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { changePasswordApi, retrieveUserApi, updateProfileInfoApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

import profileImage from "../../../assets/executive-insight-blank-user.png";

export default function EditProfileComponent() {

    const authContext = useAuth();
    const navigate = useNavigate();
    const username = authContext.username();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [user, setUser] = useState([]);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [matchPassword, setMatchPassword] = useState('');
    const [message, setMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [showAlert, setAlert] = useState(false);
    const [mainAlert, setMainAlert] = useState(false);
    const [mainMessage, setMainMessage] = useState('');

    useEffect(() => {
        authContext.refresh()
        const getInfo = async () => {
            await retrieveUserApi(username)
                .then((response) => {
                    setUser(response.data)
                    setName(response.data.name);
                    if (response.data.bio!==null) {
                        setBio(response.data.bio);
                    }
                    if (response.data.location!==null) {
                        setLocation(response.data.location);
                    }
                })
                .catch((error) => navigate('/error'))
        }

        getInfo();
        
    }, [authContext, username, navigate])

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleBioChange(event) {
        setBio(event.target.value);
    }

    function handleLocationChange(event) {
        setLocation(event.target.value);
    }

    function handleSubmit() {
        const user = {
            name: name,
            email: username,
            password: '',
            bio: bio,
            location: location
        }
        updateProfileInfoApi(user)
            .then((response) => navigate('/user-profile'))
            .catch((error) => navigate('/error'))
    }

    function handleChangePassword() {
        setShowChangePassword(true);
        setAlert(false);
        setMessage(false);
        setOldPassword('');
        setPassword('');
        setMatchPassword('');
    }

    function handleOldPasswordChange(event) {
        setOldPassword(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
        if (event.target.value!==matchPassword) {
            setAlertColor('alert alert-warning');
            setMessage('Password did not match');
        } else {
            setAlertColor('alert alert-success');
            setMessage('Password matched');
        }
    }

    function handleMatchPasswordChange(event) {
        setAlert(true);
        setMatchPassword(event.target.value)
        if (event.target.value!==password) {
            setAlertColor('alert alert-warning');
            setMessage('Password did not match');
        } else {
            setAlertColor('alert alert-success');
            setMessage('Password matched');
        }
    }

    function handleSavePassword() {
        if (password!==matchPassword) {
            setAlert(true);
            setAlertColor('alert alert-danger');
            setMessage("Password did not match");
        } else {
            setShowChangePassword(false);
            setAlert(false);
            const thePassword = {
                email: username,
                oldPassword: oldPassword,
                newPassword: password
            }
            changePasswordApi(thePassword)
            .then((response) => {
                setMainAlert(true);
                setAlertColor('alert alert-success')
                setMainMessage(response.data);
            })
            .catch((error) => {
                setMainAlert(true);
                setAlertColor('alert alert-danger')
                setMainMessage(error.response.data);
            })
        }
    }

    return (
        <div className="container mt-4">
            <Row>
                <Col xs={3}>
                    {user.image===null && <Image src={profileImage} alt="Profile" roundedCircle style={{ width: '250px', height: '250px' }} className="mb-4"  />}
                    {user.image!==null && <Image src={`data:image/png;base64,${user.image}`} alt="Profile" roundedCircle style={{ width: '250px', height: '250px' }} className="mb-4"  />}
                    <Link className="btn btn-outline-secondary form-control mb-4 mt-2" to={'/user-profile/edit/photo'}>Change Photo</Link>
                </Col>
                <Col xs={6}>
                    {mainAlert && <div className={alertColor}>{mainMessage}</div>}
                    <h5 className="text-start">Change Profile Info</h5>
                    <hr />
                    <div className="text-start">
                        <label className="form-label mb-2 p-0">Name</label>
                        <input type="text" className="form-control" value={name} onChange={handleNameChange} required />
                        <label className="form-label mb-2 p-0">Bio</label>
                        <textarea type="text" className="form-control" value={bio} onChange={handleBioChange} required />
                        <label className="form-label mb-2 p-0">Location</label>
                        <input type="text" className="form-control" value={location} onChange={handleLocationChange} required />
                        <div className="d-flex mt-4">
                            <div className="btn btn-success" onClick={handleSubmit}>Save Changes</div>
                            {!showChangePassword && <div className="btn btn-secondary mx-2" onClick={handleChangePassword}>Change Password</div>}
                        </div>
                    </div>
                    {showChangePassword && <h5 className="text-start mt-4">Change Password</h5>}
                    {showChangePassword && <hr />}
                    {showAlert && <div className={alertColor}>{message}</div>}
                    {showChangePassword &&
                    <div className="text-start">
                        <label className="form-label mb-2 p-0">Old Password</label>
                        <input type="password" className="form-control" value={oldPassword} onChange={handleOldPasswordChange} required />
                        <label className="form-label mb-2 p-0">New Password</label>
                        <input type="password" className="form-control" value={password} onChange={handlePasswordChange} required />
                        <label className="form-label mb-2 p-0">Match New Password</label>
                        <input type="password" className="form-control" value={matchPassword} onChange={handleMatchPasswordChange} required />
                        <div className="btn btn-secondary mt-4" onClick={handleSavePassword}>Change Password</div>
                    </div>
                    }
                </Col>
            </Row>
        </div>
    )
}