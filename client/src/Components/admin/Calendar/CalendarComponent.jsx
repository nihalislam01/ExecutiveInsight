import SidebarComponent from "../SidebarComponent"
import GoogleCalendarComponent from "./GoogleCalendarComponent"

export default function CalendarComponent() {
    return (
        <div className="d-flex">
            <SidebarComponent />
            <GoogleCalendarComponent />
        </div>
    )
}