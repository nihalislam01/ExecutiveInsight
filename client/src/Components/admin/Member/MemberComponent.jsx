import SidebarComponent from '../SidebarComponent';
import ListMemberComponent from './ListMemberComponent';
export default function MemberComponent() {
    return (
        <div className='d-flex'>
            <SidebarComponent />
            <ListMemberComponent />
        </div>
    )
}