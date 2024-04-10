import { Col, Row, Image } from "react-bootstrap";
import BadgeOne from '../../../assets/executive-insight-level-1.png';
import BadgeTwo from '../../../assets/executive-insight-level-2.png';
import BadgeThree from '../../../assets/executive-insight-level-3.png';
import BadgeFour from '../../../assets/executive-insight-level-4.png';

export default function ProfileBadgeComponent(props) {

    const calculateArcLength = () => {
        const arcLength = (props.badge.points / props.badge.pointLimit) * (2 * Math.PI * 50);
        return arcLength;
      };

    return (
        <Row className="mb-4">
            <Col className="mx-2" style={{ backgroundColor: "#e9ecef", borderRadius: "8px" }}>
                <p>{props.badge.points}/{props.badge.pointLimit}</p>
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
                <h6 className="mx-2 mt-4">Top Badge (lvl {props.badge.badgeLevel})</h6>
                {props.badge.badgeLevel===1 && <Image src={BadgeOne} alt="badge" style={{width: "200px", height: "200px"}} />}
                {props.badge.badgeLevel===2 && <Image src={BadgeTwo} alt="badge" style={{width: "200px", height: "200px"}} />}
                {props.badge.badgeLevel===3 && <Image src={BadgeThree} alt="badge" style={{width: "200px", height: "200px"}} />}
                {props.badge.badgeLevel>=4 && <Image src={BadgeFour} alt="badge" style={{width: "200px", height: "200px"}} />}
            </Col>
        </Row>
    )
}