import SidebarComponent from '../SidebarComponent';
import DashboardDetailsComponent from './DashboardDetailsComponent';
export default function DashboardComponent() {
    return (
        <div className='d-flex'>
            <SidebarComponent />
            <DashboardDetailsComponent />
        </div>
    )
}