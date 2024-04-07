import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useAuth} from '../../../security/AuthContext';
import { retrieveDashboardDetailsApi, retrieveDistinctDashboardDetailsApi } from "../../../api/ExecutiveInsightApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCartShopping, faChartLine, faDollar, faUserGroup } from "@fortawesome/free-solid-svg-icons";

export default function DashboardDetailsComponent() {

    const [details, setDetails] = useState([]);
    const [distinct, setDistinct] = useState([{}]);

    const authContext = useAuth();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        authContext.refresh();
        const getDetails = async () => {
            await retrieveDashboardDetailsApi(id)
                .then((response)=>setDetails(response.data))
                .catch((error)=>{
                    console.log("Error fetching dashboard details: " + error)
                    navigate('/error')
                })
            await retrieveDistinctDashboardDetailsApi(id)
                .then((response)=>{
                    console.log(response.data)
                    setDistinct(response.data)
                })
                .catch((error)=>{
                    console.log("Error fetching distinct details: " + error)
                    navigate('/error')
                })
        }

        getDetails ();

    },[authContext, id, navigate])

    const formatNumber = (number) => {
        if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
          }
        if (number >= 1000000000) {
          return (number / 1000000000).toFixed(1) + 'B';
        }
        return Number(number).toLocaleString();
      }
    
      const maxMoney = Math.max(...distinct.map(item => item.money));
      const maxQuantity = Math.max(...distinct.map(item => item.quantity));
    
      return (
        <div className="container mt-4">
            <h2 className="text-start">Dashboard</h2>
            <hr />
            <div className="d-flex justify-content-center">
                <div className="text-start dashboard-box">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faUserGroup} style={{fontSize: "40px"}} />
                        <div>
                            <p className="m-0 mx-4">Members</p>
                            <h2 className="mx-4">{formatNumber(details.users)}</h2>
                        </div>
                    </div>
                </div>
                <div className="text-start dashboard-box">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faCartShopping} style={{fontSize: "40px"}} />
                        <div>
                            <p className="m-0 mx-4">Avg. Sale Value</p>
                            {details.quantity===0 && <h2 className="mx-4">US<FontAwesomeIcon icon={faDollar} /> {formatNumber(details.totalValue)}</h2>}
                            {details.quantity!==0 && <h2 className="mx-4">US<FontAwesomeIcon icon={faDollar} /> {formatNumber(details.totalValue/details.quantity)}</h2>}
                        </div>
                    </div>
                </div>
                <div className="text-start dashboard-box">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faChartLine} style={{fontSize: "40px"}} />
                        <div>
                            <p className="m-0 mx-4">Total Sale Value</p>
                            <h2 className="mx-4">US<FontAwesomeIcon icon={faDollar} /> {formatNumber(details.totalValue)}</h2>
                        </div>
                    </div>
                </div>
                <div className="text-start dashboard-box">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faBox} style={{fontSize: "40px"}} />
                        <div>
                            <p className="m-0 mx-4">Sale Quantity</p>
                            <h2 className="mx-4">{formatNumber(details.quantity)}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex">
                <div className="chart-box d-flex text-start" style={{flexDirection: "column"}}>
                    <h5>Sales Values</h5>
                    <div style={{ display: 'flex', alignItems: 'end' }}>
                    {distinct.map((item, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginRight: '30px'}}>
                            <div>{formatNumber(item.money)}</div>
                            <div style={{backgroundColor: '#8da9c4',width: '20px',height: `${(item.money / maxMoney) * 170}px`,marginBottom: '5px'}}></div>
                            <div>{item.name}</div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="chart-box">
                    <h5 className="text-start">Sales Quantity</h5>
                    {distinct.map((item, index) => (
                        <div key={index}>
                            <div className="d-flex justify-content-between mb-2">
                                <p className="m-0">{item.name}</p>
                                <p className="m-0">{item.quantity} Units</p>
                            </div>
                            <div style={{ backgroundColor: '#8da9c4', height: '10px', width: `${(item.quantity / maxQuantity) * 100}%`, marginBottom: "10px", borderRadius: "5px"}}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
}