import { useEffect, useState } from "react";
import { getStats } from "../services/dashboardService";

import StatCard from "./StatCard";

import "../styles/dashboardStats.css";

function DashboardStats() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        try {

            const data = await getStats();

            setStats(data);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!stats) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="stats-wrapper">

            <h2 className="stats-heading">

                📊 Placement Statistics

            </h2>

            <div className="stats-grid">

                <StatCard

                    icon="📋"
                    title="Applications"
                    value={stats.applied}
                    subtitle={`+${stats.applied} this month`}
                    iconColor="#2563eb"
                    valueColor="#2563eb"

                />

                <StatCard

                    icon="👥"
                    title="Interviews"
                    value={stats.interview}
                    subtitle="Keep preparing"
                    iconColor="#10b981"
                    valueColor="#10b981"

                />

                <StatCard

                    icon="🏆"
                    title="Offers"
                    value={stats.selected}
                    subtitle="Congratulations!"
                    iconColor="#8b5cf6"
                    valueColor="#8b5cf6"

                />

                <StatCard

                    icon="❌"
                    title="Rejected"
                    value={stats.rejected}
                    subtitle="Never give up"
                    iconColor="#ef4444"
                    valueColor="#ef4444"

                />

            </div>

        </div>

    );

}

export default DashboardStats;