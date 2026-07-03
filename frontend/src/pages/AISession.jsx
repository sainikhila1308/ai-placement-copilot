import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSession } from "../services/aiServices";

import WorkspaceMenu from "../components/WorkspaceMenu";
import JDAnalyzer from "../components/JDAnalyzer";
import ResumeAnalyzer from "../components/ResumeAnalyzer";
import InterviewPrep from "../components/InterviewPrep";
import CareerFeedback from "../components/CareerFeedback";
import "../styles/workspace.css";

function AISession() {

    const { id } = useParams();

    const [session, setSession] = useState(null);

    const [activeModule, setActiveModule] = useState("jd");

    useEffect(() => {
        loadSession();
    }, []);

    const loadSession = async () => {
        try {

            const data = await getSession(id);

            setSession(data);

        } catch (error) {
            console.log(error);
        }
    };

    if (!session) {
        return <h2>Loading...</h2>;
    }

    return (

        <div className="ai-workspace">

<h1 className="workspace-title">

🤖 {session.title}

</h1>

            <hr />
            <div className="workspace-card">

<h2>

    📄 Job Description

</h2>

<textarea
    className="workspace-textarea"
    rows="15"
    value={session.jobDescription}
    readOnly
/>

</div>

            <WorkspaceMenu
                activeModule={activeModule}
                setActiveModule={setActiveModule}
            />

            <hr />

            {activeModule === "jd" && (
                <JDAnalyzer
                    sessionId={session._id}
                    jobDescription={session.jobDescription}
                />
            )}

            {activeModule === "resume" && (
                <ResumeAnalyzer
                    sessionId={session._id}
                    jobDescription={session.jobDescription}
                />
            )}

            {activeModule === "interview" && (
                <InterviewPrep
                    sessionId={session._id}
                    jobDescription={session.jobDescription}
                />
            )}

            {activeModule === "career" && (
                <CareerFeedback
                    sessionId={session._id}
                    jobDescription={session.jobDescription}
                />
            )}

        </div>

    );
}

export default AISession;