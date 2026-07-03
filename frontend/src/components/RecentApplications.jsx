import { useEffect, useState } from "react";
import { getStats } from "../services/dashboardService";
import "../styles/recentApplications.css";

function RecentApplications() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const data = await getStats();

            setJobs(data.recentJobs);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="recent-container">

            <h2>📋 Recent Applications</h2>

            {jobs.length === 0 ? (

                <p>No applications yet.</p>

            ) : (

                jobs.map((job) => (

                    <div
                        className="recent-card"
                        key={job._id}
                    >

                        <div>

                            <h3>{job.company}</h3>

                            <p>{job.role}</p>

                        </div>

                        <span className={`status ${job.status.toLowerCase()}`}>

                            {job.status}

                        </span>

                    </div>

                ))

            )}

        </div>

    );

}

export default RecentApplications;