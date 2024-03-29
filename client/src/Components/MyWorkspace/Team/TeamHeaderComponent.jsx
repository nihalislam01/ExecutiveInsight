export default function TeamHeaderComponent(props) {
    const showMembers = () => {
        props.setShowMembers(true);
        props.setShowTasks(false);
        props.setShowDeliveries(false);
    }
    const showTasks = () => {
        props.setShowMembers(false);
        props.setShowTasks(true);
        props.setShowDeliveries(false);
    }
    const showDeliveries = () => {
        props.setShowMembers(false);
        props.setShowTasks(false);
        props.setShowDeliveries(true);
    }
    return (
        <header className='border-bottom border-light border-5 mb-3 p-2'>
            <div className='container'>
                <div className='row'>
                    <nav className='navbar navbar-expand-lg'>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <button className='nav-link m-0' onClick={showMembers}>Member</button>
                            </li>
                            <li className='nav-item'>
                                <button className='nav-link m-0' onClick={showTasks}>Task</button>
                            </li>
                            <li className='nav-item'>
                                <button className='nav-link m-0' onClick={showDeliveries}>Delivery</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}