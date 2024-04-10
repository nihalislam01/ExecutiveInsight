import { useEffect, useState } from "react";
import { useAuth } from "../../../security/AuthContext";
import { useNavigate } from "react-router-dom";
import { retrieveTeamsByWorkspaceAndUserApi } from "../../../api/ExecutiveInsightApiService";
import SingleTeamComponent from "../../admin/Team/SingleTeamComponent";

export default function ListTeam(props) {

    const [hasTeams, setHasTeams] = useState(false);
    const [teams, setTeams] = useState([{}]);

    const authContext = useAuth();
    const email = authContext.username();
    const navigate = useNavigate();

    useEffect(() => {
        authContext.refresh()
        retrieveTeamsByWorkspaceAndUserApi(props.id, email)
            .then((response) => {
                setHasTeams(response.data.length > 0);
                setTeams(response.data);
            })
            .catch((error) => navigate('/error'))
    }, [authContext, props, navigate, email])

    return (
        <div className="p-4">
            <div className="row g-2">
                {!hasTeams && <h5>You haven't joined any team in this workspace</h5>}
                {hasTeams &&
                    teams.map(
                        (team, key) => (
                            <SingleTeamComponent key={key} team={team} id={props.id} />
                        )
                    )
                }
            </div>
        </div>
    )
}