import { useEffect, useState } from 'react';
import SidebarComponent from '../SidebarComponent';
import Pending from './Pending';
import Delivered from './Delivered';
import SaleHeader from './SaleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../security/AuthContext';
import { retrieveDeliveriesApi } from '../../../api/ExecutiveInsightApiService';
export default function SaleComponent() {

    const [showPendings, setShowPendings] = useState(true);
    const [showDeliveries, setShowDeliveries] = useState(false);
    const [deliveries, setDeliveries] = useState([]);
    const {id} = useParams();
    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        authContext.refresh()
        const getDelivery = async () => {
            await retrieveDeliveriesApi(id)
            .then((response)=>setDeliveries(response.data))
            .catch((error)=>{
                console.log("Error fetching deliveries: " + error);
                navigate('/error');
            })
        }

        getDelivery();

    },[authContext, id, navigate])

    return (
        <div>
            <div className='d-flex'>
                <SidebarComponent />
                <div className='w-100'>
                    <SaleHeader setShowDeliveries={setShowDeliveries} setShowPendings={setShowPendings} />
                    {showPendings && <Pending deliveries={deliveries} />}
                    {showDeliveries && <Delivered deliveries={deliveries} />}
                </div>
            </div>
        </div>
    )
}