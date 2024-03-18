import { Col, Row } from "react-bootstrap";
import TeamComponent from "./TeamComponent";
import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthContext";
import { retrieveWorkspaceByIdApi } from "../api/ExecutiveInsightApiService";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateTeamComponent from "./CreateTeamComponent";
import '../styles/ListTeamComponent.css';

export default function ListTeamComponent() {

    const [hasTeams, setHasTeams] = useState(false);
    const [teams, setTeams] = useState([{}]);
    const [show, setShow] = useState(false);
    const [workspaceCode, setWorkspaceCode] = useState('');
    const authContext = useAuth();
    const email = authContext.username();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => refreshPage(), [])

    function refreshPage() {
        authContext.refresh()
        retrieveWorkspaceByIdApi(id)
            .then((response) => {
                setHasTeams(response.data.teams.length > 0);
                setTeams(response.data.teams);
                setWorkspaceCode(response.data.code);
            })
            .catch((error) => navigate('/error'))
    }

    function addTeam() {
        setShow(!show);
    }


    return (
        <div className="ListTeamComponent">
            {show &&
                <CreateTeamComponent workspaceCode={workspaceCode} setShow={setShow} id={id} email={email} />
            }
            <Row>
                <Col xs={2}></Col>
                <Col xs={10}>
                    <h5 className="text-start my-4">Teams</h5>
                    <div className="row g-2">
                        {hasTeams &&
                            teams.map(
                                team => (
                                    <TeamComponent team={team} />
                                )
                            )
                        }
                        <div className="col-12 col-md-3">
                            <div className="w-100 create-team" onClick={addTeam}>
                                <h4 style={{ paddingTop: "58px", paddingBottom: "58px" }}><FontAwesomeIcon icon={faPlus} /></h4>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}