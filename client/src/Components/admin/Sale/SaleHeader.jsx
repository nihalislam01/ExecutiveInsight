import '../../../styles/ProfileHeaderComponent.css';

export default function SaleHeader(props) {

    const showPendings = () => {
        props.setShowPendings(true);
        props.setShowDeliveries(false);
    }

    const showDeliveries = () => {
        props.setShowPendings(false);
        props.setShowDeliveries(true);
    }

    return (
        <div className="nav py-3 px-3 mb-3 border-bottom border-5" style={{ height: "10vh" }}>
            <div className='w-100 d-flex justify-content-around'>
                <p className="option" onClick={showPendings}>Pending</p>
                <p className="option" onClick={showDeliveries}>Delivered</p>
            </div>
        </div>
    )
}