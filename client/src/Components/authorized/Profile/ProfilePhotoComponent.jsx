import { Image } from "react-bootstrap";

import profileImage from "../../../assets/executive-insight-blank-user.png";

export default function ProfilePhotoComponent({user}) {
    return (
        <div>
            {user.image===null && <Image src={profileImage} alt="Profile" roundedCircle style={{ width: '250px', height: '250px' }} className="mb-4"  />}
            {user.image!==null && <Image src={`data:image/png;base64,${user.image}`} alt="Profile" roundedCircle style={{ width: '250px', height: '250px' }} className="mb-4"  />}
            <h2 className="mb-2">{user.name}</h2>
            {user.bio!==null &&
                <p>{user.bio}</p>
            }
        </div>
    )
}