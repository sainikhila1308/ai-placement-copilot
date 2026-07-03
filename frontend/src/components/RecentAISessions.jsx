import "../styles/recentAISessions.css";

function RecentAISessions() {

    return (

        <div className="recent-ai-card">

            <div className="recent-header">

                <h2>🤖 Recent AI Sessions</h2>

                <span>View All</span>

            </div>

            <div className="empty-ai">

                <h3>No AI Sessions Yet</h3>

                <p>
                    Start using the AI Career Assistant to see your recent sessions here.
                </p>

            </div>

        </div>

    );

}

export default RecentAISessions;