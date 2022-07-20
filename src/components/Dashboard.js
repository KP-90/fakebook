// Section of the page below the Header. Will hold most, if not all, of the main frontpage content.
// import components
import SidePanel from "./SidePanel"
import Timeline from "./postFiles/Timeline"
import '../styles/dashboard.css'

const Dashboard = () => {

    return(
        <div className="dashboard">
            <SidePanel />
            <Timeline />
        </div>
        
    )
}

export default Dashboard