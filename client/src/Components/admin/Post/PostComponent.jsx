import SidebarComponent from '../SidebarComponent';
import ListPostComponent from './ListPostComponent';
export default function PostComponent() {
    return (
        <div className='d-flex'>
            <SidebarComponent />
            <ListPostComponent />
        </div>
    )
}