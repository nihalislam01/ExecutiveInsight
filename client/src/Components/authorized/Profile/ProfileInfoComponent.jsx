import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

export default function ProfileInfoComponent(props) {
    return (
        <div>
            <Row>
                <Col xs={1}><FontAwesomeIcon icon={faEnvelope} /></Col>
                <Col xs={11}><p>{props.username}</p></Col> 
            </Row>
            {props.location!=='' &&
                <Row>
                    <Col xs={1}><FontAwesomeIcon icon={faLocationDot} /></Col>
                    <Col xs={11}><p>{props.location}</p></Col> 
                </Row>
            }
        </div>
    )
}