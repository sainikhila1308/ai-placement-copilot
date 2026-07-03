import AICareerAssistant from "../components/AICareerAssistant";


import "../styles/aiAssistant.css";

function AIAssistant() {

    return (

        <div className="ai-page">

            <div className="ai-hero">

                <h1>🤖 AI Placement Copilot</h1>

                <p>

                    Analyze Job Descriptions, Compare Resumes,
                    Prepare Interviews and Get AI Career Guidance.

                </p>

            </div>

            <AICareerAssistant />

        </div>

    );

}



export default AIAssistant;