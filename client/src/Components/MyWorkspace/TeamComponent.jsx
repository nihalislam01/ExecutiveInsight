export default function TeamComponent(props) {

    function selectColor(id) {
        const colors = ["info", "success", "primary", "secondary"]
        return colors[id%4];
    }

    return (
        <div className="col-12 col-md-3">
            <div className={`btn btn-${selectColor(props.team.teamId)} w-100 text-start`}>
                <h4 style={{ paddingBottom: "95px" }}>{props.team.name}</h4>
            </div>
        </div>
    )
}