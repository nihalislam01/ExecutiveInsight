import SidebarComponent from "../SidebarComponent";
import ListAttendance from "./ListAttendance";

export default function AttendanceComponent() {
    return (
        <div className="d-flex">
            <SidebarComponent />
            <ListAttendance />
        </div>
    )
}