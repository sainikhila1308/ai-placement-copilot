import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import QuickActions from "../components/QuickActions";
import RecentApplications from "../components/RecentApplications";
import RecentAISessions from "../components/RecentAISessions";
import MotivationCard from "../components/MotivationCard";

import "../styles/dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    return (

        <div className="dashboard-page">

            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="dashboard-content">

                {/* Mobile Navbar */}
                <MobileNavbar />

                <div className="dashboard">

                    <DashboardHeader />

                    <DashboardStats />

                    <QuickActions navigate={navigate} />

                    <div className="dashboard-bottom">

                        <RecentApplications />

                        <RecentAISessions />

                    </div>

                    <MotivationCard />

                </div>

            </div>

        </div>

    );

}

export default Dashboard;