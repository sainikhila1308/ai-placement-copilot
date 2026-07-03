import { useEffect, useState } from "react";
import "../styles/dashboardHeader.css";

function DashboardHeader() {

    const [username, setUsername] = useState("");

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {

            setUsername(user.name);

        }

    }, []);

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {

        greeting = "Good Morning";

    } else if (hour < 17) {

        greeting = "Good Afternoon";

    }

    return (

        <div className="dashboard-header">

            <h1>

                {greeting}, {username} 👋

            </h1>

            <p>

                Here's what's happening with your placement journey today.

            </p>

        </div>

    );

}

export default DashboardHeader;