import { useState } from "react";
import { getInterviewPrep } from "../services/aiServices";
import "../styles/workspace.css";

function InterviewPrep({ sessionId }) {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleGenerate = async () => {

        try {

            setLoading(true);

            const data = await getInterviewPrep(sessionId);

            setResult(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };
    const copyQuestions = () => {

        if (!result) return;
    
        const text = `
    
    Difficulty:
    ${result.difficulty}
    
    Technical Questions:
    ${result.technicalQuestions.join("\n")}
    
    Coding Questions:
    ${result.codingQuestions.join("\n")}
    
    HR Questions:
    ${result.hrQuestions.join("\n")}
    
    Topics to Revise:
    ${result.revisionTopics.join("\n")}
    
    `;
    
        navigator.clipboard.writeText(text);
    
        alert("Interview questions copied!");
    
    };

    return (

        <div className="ai-result">
    
            <h2 className="ai-result-title">
    
                💻 Interview Preparation
    
            </h2>
    
            <p style={{ marginBottom: "20px", color: "#666" }}>
    
                Generate AI-powered interview questions based on the selected Job Description.
    
            </p>
    
            <button
                className="analyze-btn"
                onClick={handleGenerate}
            >
    
                🚀 Generate Interview Questions
    
            </button>
    
            {
    
                loading &&
    
                <div className="loading-box">
    
                    🤖 AI is preparing your interview...
    
                </div>
    
            }
    
            {
    
                result &&
    
                <div style={{ marginTop: "35px" }}>
    
                    <div className="result-section">
    
                        <h3>🎯 Difficulty</h3>
    
                        <span className="difficulty">
    
                            {result.difficulty}
    
                        </span>
    
                    </div>
    
                    <div className="result-section">
    
                        <h3>💻 Technical Questions</h3>
    
                        <ul className="result-list">
    
                            {
    
                                result.technicalQuestions.map((q, index) => (
    
                                    <li key={index}>
    
                                        {q}
    
                                    </li>
    
                                ))
    
                            }
    
                        </ul>
    
                    </div>
    
                    <div className="result-section">
    
                        <h3>🧠 Coding Questions</h3>
    
                        <ul className="result-list">
    
                            {
    
                                result.codingQuestions.map((q, index) => (
    
                                    <li key={index}>
    
                                        {q}
    
                                    </li>
    
                                ))
    
                            }
    
                        </ul>
    
                    </div>
    
                    <div className="result-section">
    
                        <h3>👨‍💼 HR Questions</h3>
    
                        <ul className="result-list">
    
                            {
    
                                result.hrQuestions.map((q, index) => (
    
                                    <li key={index}>
    
                                        {q}
    
                                    </li>
    
                                ))
    
                            }
    
                        </ul>
    
                    </div>
    
                    <div className="result-section">

<h3>📚 Topics to Revise</h3>

<ul className="result-list">

    {
        result.revisionTopics.map((q, index) => (

            <li key={index}>
                {q}
            </li>

        ))
    }

</ul>

<br />

<button
    className="copy-btn"
    onClick={copyQuestions}
>
    📋 Copy Questions
</button>

</div>
    
                </div>
    
            }
    
        </div>
    
    );
}

export default InterviewPrep;