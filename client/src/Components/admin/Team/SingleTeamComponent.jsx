import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { removeTeamApi } from "../../../api/ExecutiveInsightApiService";
import { useAuth } from "../../../security/AuthContext";

export default function SingleTeamComponent(props) {

    const navigate = useNavigate();
    const authContext = useAuth();
    const isMine = authContext.isMine(props.id);

    function selectColor(id) {
        const customColors = ["3a5a40", "7f5539", "588157", "30638e", "3c6e71", "ad2831", "495057", "b5838d", "6a4c93", "ee6c4d"];
        return customColors[id%10];
    }

    const goToTeamDetails = (id) => {
        navigate(`/team/${id}/${props.id}`)
    }

    const deleteTeam = async (teamId) => {
        await removeTeamApi(teamId, props.id)
            .then((response)=>props.setSuccess("Team deleted"))
            .catch((error)=>props.setError("Error deleting team"))
    }

    const styleOne = {borderRadius: "8px", backgroundColor: `#${selectColor(props.team.teamId)}`, color: "white", height: "114px", overflow: "auto", borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px"}
    const styleTwo = {borderRadius: "8px", backgroundColor: `#${selectColor(props.team.teamId)}`, color: "white", height: "144px", overflow: "auto"}
 
    return (
        <div className="col-12 col-md-3">
            {isMine && <div className={`btn w-100 text-start`} style={styleOne} onClick={() => goToTeamDetails(props.team.teamId)}>
                <h4>{props.team.name}</h4>
            </div>}
            {!isMine && <div className={`btn w-100 text-start`} style={styleTwo} onClick={() => goToTeamDetails(props.team.teamId)}>
                <h4>{props.team.name}</h4>
            </div>}
            {isMine && <div className="text-end px-2" style={{ backgroundColor: "white", border: `solid 2px #${selectColor(props.team.teamId)}`, borderRadius: "8px", height: "30px", borderTopLeftRadius: "0px", borderTopRightRadius: "0px"}}>
                <p className="ellipsis m-0" onClick={() => deleteTeam(props.team.teamId)}><FontAwesomeIcon icon={faTrashCan} /></p>
            </div>}
        </div>
    )
}