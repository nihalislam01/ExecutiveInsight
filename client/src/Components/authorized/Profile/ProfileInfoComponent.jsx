import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

export default function ProfileInfoComponent({user}) {
    return (
        <div>
            <Row>
                <Col xs={1}><FontAwesomeIcon icon={faEnvelope} /></Col>
                <Col xs={11}><p>{user.email}</p></Col> 
            </Row>
            {user.location!==null &&
                <Row>
                    <Col xs={1}><FontAwesomeIcon icon={faLocationDot} /></Col>
                    <Col xs={11}><p>{user.location}</p></Col> 
                </Row>
            }
        </div>
    )
}