import { useState } from "react";
import { getCareerFeedback } from "../services/aiServices";
import "../styles/workspace.css";

function CareerFeedback({ sessionId }) {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleGenerate = async () => {

        try {

            setLoading(true);

            const data = await getCareerFeedback(sessionId);

            console.log(data);

            setResult(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const copyFeedback = () => {

        if (!result) return;

        navigator.clipboard.writeText(
            JSON.stringify(result, null, 2)
        );

        alert("Career feedback copied!");

    };

    return (

        <div className="ai-result">

            <h2 className="ai-result-title">

                🎯 Career Feedback

            </h2>

            <p style={{ marginBottom: "20px", color: "#666" }}>

                Get personalized AI career guidance based on the selected Job Description.

            </p>

            <button
                className="analyze-btn"
                onClick={handleGenerate}
            >

                🚀 Generate Career Feedback

            </button>

            {

                loading &&

                <div className="loading-box">

                    🤖 AI is preparing your career roadmap...

                </div>

            }

            {

                result && (

                    <div style={{ marginTop: "35px" }}>

                        <div className="result-section">

                            <h3>⭐ Overall Fit Score</h3>

                            <span className="difficulty">

                                {result.fitScore}%

                            </span>

                        </div>

                        <div className="result-section">

                            <h3>💪 Strengths</h3>

                            <ul className="result-list">

                                {result.strengths?.map((item, index) => (

                                    <li key={index}>

                                        {typeof item === "object"
                                            ? JSON.stringify(item)
                                            : item}

                                    </li>

                                ))}

                            </ul>

                        </div>

                        <div className="result-section">

                            <h3>📈 Missing Skills</h3>

                            <ul className="result-list">

                                {result.missingSkills?.map((item, index) => (

                                    <li key={index}>

                                        {typeof item === "object"
                                            ? JSON.stringify(item)
                                            : item}

                                    </li>

                                ))}

                            </ul>

                        </div>

                        <div className="result-section">

                            <h3>🛣️ Learning Roadmap</h3>

                            <ul className="result-list">

                                {result.learningRoadmap?.map((item, index) => (

                                    <li key={index}>

                                        {

                                            typeof item === "object"

                                                ? (
                                                    <>
                                                        <strong>

                                                            {item.topic || "Topic"}

                                                        </strong>

                                                        <br />

                                                        {item.resources &&
                                                            item.resources.join(", ")}

                                                        <br />

                                                        {item.estimatedTime}

                                                    </>
                                                )

                                                : item

                                        }

                                    </li>

                                ))}

                            </ul>

                        </div>

                        <div className="result-section">

                            <h3>💻 Projects To Build</h3>

                            <ul className="result-list">

                                {result.projectsToBuild?.map((item, index) => (

                                    <li key={index}>

                                        {

                                            typeof item === "object"

                                                ? (
                                                    <>
                                                        <strong>

                                                            {item.project}

                                                        </strong>

                                                        <br />

                                                        {item.description}

                                                    </>
                                                )

                                                : item

                                        }

                                    </li>

                                ))}

                            </ul>

                        </div>

                        <div className="result-section">

                            <h3>🏆 Recommended Certifications</h3>

                            <ul className="result-list">

                                {result.certifications?.map((item, index) => (

                                    <li key={index}>

                                        {

                                            typeof item === "object"

                                                ? JSON.stringify(item)

                                                : item

                                        }

                                    </li>

                                ))}

                            </ul>

                        </div>

                        <div className="result-section">

                            <h3>⏳ Estimated Preparation Time</h3>

                            <span className="difficulty">

                                {result.estimatedPreparationTime}

                            </span>

                        </div>

                        <br />

                        <button

                            className="copy-btn"

                            onClick={copyFeedback}

                        >

                            📋 Copy Feedback

                        </button>

                    </div>

                )

            }

        </div>

    );

}

export default CareerFeedback;