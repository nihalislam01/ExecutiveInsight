import SidebarComponent from '../SidebarComponent';
import ListProductComponent from './ListProductComponent';
export default function ProductComponent() {
    return (
        <div className='d-flex'>
            <SidebarComponent />
            <ListProductComponent />
        </div>
    )
}