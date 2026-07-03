import "../styles/quickActions.css";

function QuickActions({ navigate }) {

    return (

        <div className="quick-container">

            <h2>Quick Actions</h2>

            <div className="quick-grid">

                <div
                    className="quick-card"
                    onClick={() => navigate("/placement")}
                >

                    <div className="quick-icon">
                        📋
                    </div>

                    <div className="quick-text">

                        <h3>Placement Tracker</h3>

                        <p>
                            Track, manage and organize all your job applications.
                        </p>

                    </div>

                    <span className="arrow">
                        ➜
                    </span>

                </div>

                <div
                    className="quick-card"
                    onClick={() => navigate("/ai")}
                >

                    <div className="quick-icon">
                        🤖
                    </div>

                    <div className="quick-text">

                        <h3>AI Career Assistant</h3>

                        <p>
                            Analyze jobs, improve resumes and prepare for interviews.
                        </p>

                    </div>

                    <span className="arrow">
                        ➜
                    </span>

                </div>

            </div>

        </div>

    );

}

export default QuickActions;