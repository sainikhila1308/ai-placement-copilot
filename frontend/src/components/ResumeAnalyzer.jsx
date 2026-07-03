import { useState } from "react";

import { analyzeResume } from "../services/aiServices";
import "../styles/workspace.css";

function ResumeAnalyzer({ sessionId }) {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const fileName = file ? file.name : "No file selected";

    const handleUpload = async () => {

        if (!file) {

            alert("Choose Resume");

            return;

        }

        try {

            setLoading(true);

            const data =
                await analyzeResume(
                    sessionId,
                    file
                );

            setResult(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="ai-result">
    
            <h2 className="ai-result-title">
    
                📄 Resume Analyzer
    
            </h2>
    
            <p style={{ marginBottom: "20px", color: "#666" }}>
    
                Upload your resume and compare it with the Job Description.
    
            </p>
            <input
    type="file"
    accept=".pdf"
    onChange={(e) =>
        setFile(e.target.files[0])
    }
/>

<p
    style={{
        marginTop: "12px",
        color: "#555",
        fontWeight: "bold"
    }}
>

    📄 {fileName}

</p>
    
            <br />
            <br />
    
            <button
                className="analyze-btn"
                onClick={handleUpload}
            >
    
                🚀 Analyze Resume
    
            </button>
    
            {
    
                loading &&
    
                <div className="loading-box">
    
                    🤖 AI is analyzing your resume...
    
                </div>
    
            }
    
            {
    
                result &&
    
                <div style={{ marginTop: "35px" }}>
    
                    <div className="result-section">
    
                        <h3>⭐ Match Score</h3>
    
                        <span className="difficulty">
    
                            {result.matchScore}%
    
                        </span>
    
                    </div>
    
                    <div className="result-section">
    
                        <h3>✅ Strengths</h3>
    
                        <ul className="result-list">
    
                            {
    
                                result.strengths.map((item, index) => (
    
                                    <li key={index}>
    
                                        {item}
    
                                    </li>
    
                                ))
    
                            }
    
                        </ul>
    
                    </div>
    
                    <div className="result-section">
    
                        <h3>❌ Missing Skills</h3>
    
                        <ul className="result-list">
    
                            {
    
                                result.missingSkills.map((item, index) => (
    
                                    <li key={index}>
    
                                        {item}
    
                                    </li>
    
                                ))
    
                            }
    
                        </ul>
    
                    </div>
    
                    <div className="result-section">
    
                        <h3>📈 ATS Suggestions</h3>
    
                        <ul className="result-list">
    
                            {
    
                                result.atsSuggestions.map((item, index) => (
    
                                    <li key={index}>
    
                                        {item}
    
                                    </li>
    
                                ))
    
                            }
    
                        </ul>
    
                    </div>
    
                    <div className="result-section">
    
                        <h3>💡 Improved Resume Points</h3>
    
                        <ul className="result-list">
    
                            {
    
                                result.improvedBulletPoints.map((item, index) => (
    
                                    <li key={index}>
    
                                        {item}
    
                                    </li>
    
                                ))
    
                            }
    
                        </ul>
    
                    </div>
    
                </div>
    
            }
    
        </div>
    
    );

}

export default ResumeAnalyzer;