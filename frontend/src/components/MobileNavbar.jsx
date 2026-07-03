import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/mobileNavbar.css";

function MobileNavbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [workspaceOpen, setWorkspaceOpen] = useState(false);

    return (

        <div className="mobile-navbar">

            <div className="mobile-top">

                <div className="mobile-logo">

                    🤖 AI Placement Copilot

                </div>

                <button
                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

            </div>

            {menuOpen && (

                <div className="mobile-menu">

                    <NavLink to="/dashboard">
                        🏠 Dashboard
                    </NavLink>

                    <NavLink to="/placement">
                        📋 Placement Tracker
                    </NavLink>

                    <div
                        className="workspace-toggle"
                        onClick={() => setWorkspaceOpen(!workspaceOpen)}
                    >

                        🤖 AI Workspace

                        <span>

                            {workspaceOpen ? "▲" : "▼"}

                        </span>

                    </div>

                    {workspaceOpen && (

                        <div className="workspace-links">

                            <NavLink to="/ai">
                                💬 AI Workspace
                            </NavLink>

                            <NavLink to="/ai">
                                📄 JD Analyzer
                            </NavLink>

                            <NavLink to="/ai">
                                📑 Resume Analyzer
                            </NavLink>

                            <NavLink to="/ai">
                                💻 Interview Prep
                            </NavLink>

                            <NavLink to="/ai">
                                🎯 Career Feedback
                            </NavLink>

                        </div>

                    )}

                </div>

            )}

        </div>

    );

}

export default MobileNavbar;