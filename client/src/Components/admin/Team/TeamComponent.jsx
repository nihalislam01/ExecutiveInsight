import SidebarComponent from '../SidebarComponent';
import ListTeamComponent from './ListTeamComponent';
export default function TeamComponent() {
    return (
        <div className='d-flex'>
            <SidebarComponent />
            <ListTeamComponent />
        </div>
    )
}