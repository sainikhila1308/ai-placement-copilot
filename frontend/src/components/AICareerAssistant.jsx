import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/aiAssistant.css";
import {
  createSession,
  getSessions,
  deleteSession,
} from "../services/aiServices";

function AICareerAssistant() {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [title, setTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await getSessions();
      setSessions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    if (!title || !jobDescription) {
      alert("Please fill all fields");
      return;
    }
  
    try {
  
      const session = await createSession({
        title,
        jobDescription,
      });
  
      setTitle("");
      setJobDescription("");
  
      loadSessions();
  
      navigate(`/ai/${session._id}`);
  
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteSession(id);
      loadSessions();
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="ai-container">

        <div className="ai-form">

            <h2>🤖 Create New AI Session</h2>

            <div className="ai-group">

                <label>Session Title</label>

                <input
                    type="text"
                    placeholder="Example: Amazon SDE Interview"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

            </div>

            <div className="ai-group">

                <label>Job Description</label>

                <textarea
                    placeholder="Paste the complete job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />

            </div>

            <button
                className="ai-create-btn"
                onClick={handleCreate}
            >
                🚀 Create AI Session
            </button>

        </div>

        <h2 className="sessions-title">

            📂 Previous AI Sessions

        </h2>

        {sessions.length === 0 ? (

            <div className="empty-ai">

                <h2>🤖</h2>

                <h3>No AI Sessions Yet</h3>

                <p>Create your first AI session to get started.</p>

            </div>

        ) : (

            sessions.map((session) => (

                <div
                    className="session-card"
                    key={session._id}
                >

                    <h3>{session.title}</h3>

                    <p>

                        {session.jobDescription.length > 150
                            ? session.jobDescription.substring(0, 150) + "..."
                            : session.jobDescription}

                    </p>

                    <div className="session-buttons">

                        <button
                            className="open-btn"
                            onClick={() => navigate(`/ai/${session._id}`)}
                        >
                            🚀 Open Workspace
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(session._id)}
                        >
                            🗑 Delete
                        </button>

                    </div>

                </div>

            ))

        )}

    </div>

);
}

export default AICareerAssistant;