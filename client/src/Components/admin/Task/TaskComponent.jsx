import SidebarComponent from '../SidebarComponent';
import ListTaskComponent from './ListTaskComponent';
export default function TaskComponent() {
    return (
        <div className='d-flex'>
            <SidebarComponent />
            <ListTaskComponent />
        </div>
    )
}