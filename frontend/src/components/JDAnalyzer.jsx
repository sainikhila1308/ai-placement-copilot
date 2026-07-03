import { useState } from "react";
import { analyzeJD } from "../services/aiServices";
import "../styles/workspace.css";

function JDAnalyzer({ sessionId }) {

    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const handleAnalyze = async () => {

        try {

            setLoading(true);

            const result = await analyzeJD(sessionId);

            setAnalysis(result);

        } catch (error) {

            console.log(error);

            alert("Failed to analyze Job Description.");

        } finally {

            setLoading(false);

        }

    };
    const copyAnalysis = () => {

        if (!analysis) return;
    
        const text = `
    
    Required Skills:
    ${analysis.requiredSkills?.join("\n")}
    
    ATS Keywords:
    ${analysis.atsKeywords?.join("\n")}
    
    Responsibilities:
    ${analysis.responsibilities?.join("\n")}
    
    Learning Topics:
    ${analysis.learningTopics?.join("\n")}
    
    Difficulty:
    ${analysis.difficulty}
    
    `;
    
        navigator.clipboard.writeText(text);
    
        alert("Analysis copied successfully!");
    
    };

    return (

        <div className="ai-result">
    
            <h2 className="ai-result-title">
                📊 JD Analyzer
            </h2>
    
            <p style={{ marginBottom: "20px", color: "#666" }}>
                Analyze the job description to identify required skills,
                ATS keywords, responsibilities and learning topics.
            </p>
    
            <button
                className="analyze-btn"
                onClick={handleAnalyze}
            >
                🚀 Analyze Job Description
            </button>
    
            {loading && (
    
                <div className="loading-box">
    
                    🤖 AI is analyzing the Job Description...
    
                </div>
    
            )}
    
            {analysis && (
    
                <div style={{ marginTop: "35px" }}>
    
                    <div className="result-section">
    
                        <h3>📌 Required Skills</h3>
    
                        <ul className="result-list">
    
                            {analysis.requiredSkills?.map((skill, index) => (
    
                                <li key={index}>
                                    {skill}
                                </li>
    
                            ))}
    
                        </ul>
    
                    </div>
    
                    <div className="result-section">
    
                        <h3>🔑 ATS Keywords</h3>
    
                        <ul className="result-list">
    
                            {analysis.atsKeywords?.map((item, index) => (
    
                                <li key={index}>
                                    {item}
                                </li>
    
                            ))}
    
                        </ul>
    
                    </div>
    
                    <div className="result-section">
    
                        <h3>📋 Responsibilities</h3>
    
                        <ul className="result-list">
    
                            {analysis.responsibilities?.map((item, index) => (
    
                                <li key={index}>
                                    {item}
                                </li>
    
                            ))}
    
                        </ul>
    
                    </div>
    
                    <div className="result-section">
    
                        <h3>📚 Learning Topics</h3>
    
                        <ul className="result-list">
    
                            {analysis.learningTopics?.map((item, index) => (
    
                                <li key={index}>
                                    {item}
                                </li>
    
                            ))}
    
                        </ul>
    
                    </div>
    
                    <div className="result-section">
    
                        <h3>🎯 Difficulty</h3>
    
                        <span className="difficulty">
    
                            {analysis.difficulty}
    
                        </span>
                        <br />
<br />

<button
    className="copy-btn"
    onClick={copyAnalysis}
>
    📋 Copy Analysis
</button>
    
                    </div>
    
                </div>
    
            )}
    
        </div>
    
    );
}

export default JDAnalyzer;