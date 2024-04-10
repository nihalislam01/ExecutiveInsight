import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../../security/AuthContext";
import { retrieveWorkspaceByIdApi } from "../../../api/ExecutiveInsightApiService";

import CreateTeamComponent from "./CreateTeamComponent";
import SingleTeamComponent from "./SingleTeamComponent";

import toast, { Toaster } from "react-hot-toast";

export default function ListTeamComponent() {

    const [hasTeams, setHasTeams] = useState(false);
    const [teams, setTeams] = useState([{}]);
    const [show, setShow] = useState(false);
    const [workspaceCode, setWorkspaceCode] = useState('');
    const [search, setSearch] = useState('');
    const [filteredTeams, setFilteredTeams] = useState([{}]);

    const authContext = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const email = authContext.username();

    useEffect(() => {
        authContext.refresh()
        retrieveWorkspaceByIdApi(id)
            .then((response) => {
                setHasTeams(response.data.teams.length > 0);
                setTeams(response.data.teams);
                setWorkspaceCode(response.data.code);
                setFilteredTeams(response.data.teams);
            })
            .catch((error) => navigate('/error'))
    }, [authContext, id, navigate])

    const addTeam = () => {
        setShow(!show);
    }

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearch(term);
        const filtered = teams.filter(team =>
          team.name.toLowerCase().includes(term.toLowerCase())
        );
        setHasTeams(filtered.length > 0);
        setFilteredTeams(filtered);
      }

      const setSuccess = (message) => {
        setShow(false);
        toast.success(message)
      }

      const setError = (message) => {
        toast.error(message);
      }

    return (
        <div className="background-06 w-100">
            <Toaster />
            <div className="p-4">
                {show &&
                    <CreateTeamComponent workspaceCode={workspaceCode} setShow={setShow} id={id} email={email} setSuccess={setSuccess} />
                }
                <div className="d-flex">
                    <h2 className="text-start mx-3">Teams</h2>
                    <input placeholder="&#xf002; Search Team" value={search} style={{ fontFamily: 'Arial, FontAwesome', backgroundColor: "#f8f9fa", marginLeft: "150px" }} className="form-control w-50 text-center" onChange={handleSearch} />
                </div>
                <hr />
                <div className="row g-2">
                    <div className="col-12 col-md-3">
                        <div className="w-100 create" onClick={addTeam}>
                            <h4 style={{ paddingTop: "58px", paddingBottom: "58px" }}><FontAwesomeIcon icon={faPlus} /></h4>
                        </div>
                    </div>
                    {hasTeams &&
                        filteredTeams.map(
                            (team, key) => (
                                <SingleTeamComponent key={key} team={team} id={id} setSuccess={setSuccess} setError={setError} />
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}