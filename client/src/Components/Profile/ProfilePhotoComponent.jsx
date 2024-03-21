import { Image } from "react-bootstrap";
import profileImage from "../styles/executive-insight-blank-user.png";

export default function ProfilePhotoComponent(props) {
    return (
        <div>
            {props.image==='' && <Image src={profileImage} alt="Profile" roundedCircle style={{ width: '250px', height: '250px' }} className="mb-4"  />}
            {props.image!=='' && <Image src={props.image} alt="Profile" roundedCircle style={{ width: '250px', height: '250px' }} className="mb-4"  />}
            <h2 className="mb-2">{props.userName}</h2>
            {props.bio!=='' &&
                <p>{props.bio}</p>
            }
        </div>
    )
}