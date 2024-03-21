import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function ProfileBadgeComponent(props) {

    const [circumference, setCircumference] = useState(3);

    const calculateArcLength = () => {
        if (props.points===circumference) {
          setCircumference(circumference*2);
        }
        const arcLength = (props.points / circumference) * (2 * Math.PI * 50);
        return arcLength;
      };

    return (
        <Row className="mb-4">
            <Col className="mx-2" style={{ backgroundColor: "#e9ecef", borderRadius: "8px" }}>
                <p>{props.points}/{circumference}</p>
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
    )
}