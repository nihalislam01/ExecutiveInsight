import { useNavigate } from "react-router-dom";

export default function SingleTeamComponent(props) {

    const navigate = useNavigate();

    function selectColor(id) {
        const customColors = ["3a5a40", "7f5539", "588157", "30638e", "3c6e71", "ad2831", "495057", "b5838d", "6a4c93", "ee6c4d"];
        return customColors[id%10];
    }
    const goToTeamDetails = (id) => {
        navigate(`/team/${id}/${props.id}`)
    }
    return (
        <div className="col-12 col-md-3">
            <div className={`btn w-100 text-start`} style={{ backgroundColor: `#${selectColor(props.team.teamId)}`, color: "white" }} onClick={() => goToTeamDetails(props.team.teamId)}>
                <h4 style={{ paddingBottom: "95px" }}>{props.team.name}</h4>
            </div>
        </div>
    )
}