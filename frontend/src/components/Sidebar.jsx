import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar({

    sidebarOpen,

    setSidebarOpen

}) {

    const [openAI, setOpenAI] = useState(false);
    const navigate = useNavigate();

const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

};

    return (

        <div

    className={`sidebar ${sidebarOpen ? "open" : ""}`}

>

            <div className="sidebar-logo">

                <div className="logo-circle">
                    🤖
                </div>

                <div>

                    <h2>AI Placement</h2>
                    <h3>Copilot</h3>

                </div>

            </div>

            <div className="sidebar-menu">

            <NavLink
    to="/dashboard"
    className="sidebar-link"
    onClick={() => setSidebarOpen(false)}
>
    🏠 Dashboard
</NavLink>

                <NavLink
                    to="/placement"
                    className="sidebar-link"
                    onClick={() => setSidebarOpen(false)}
                >
                    📋 Placement Tracker
                </NavLink>

                <button
                    className="sidebar-link ai-toggle"
                    onClick={() => setOpenAI(!openAI)}
                >
                    🤖 AI Workspace

                    <span>

                        {openAI ? "▲" : "▼"}

                    </span>

                </button>

                {

                    openAI &&

                    <div className="submenu">

                        <NavLink
                            to="/ai"
                            className="submenu-link"
                            onClick={() => setSidebarOpen(false)}
                        >
                            🧠 AI Workspace
                        </NavLink>

                        <NavLink
                            to="/ai"
                            className="submenu-link"
                            onClick={() => setSidebarOpen(false)}
                        >
                            📄 JD Analyzer
                        </NavLink>

                        <NavLink
                            to="/ai"
                            className="submenu-link"
                            onClick={() => setSidebarOpen(false)}
                        >
                            📑 Resume Analyzer
                        </NavLink>

                        <NavLink
                            to="/ai"
                            className="submenu-link"
                            onClick={() => setSidebarOpen(false)}
                        >
                            💻 Interview Prep
                        </NavLink>

                        <NavLink
                            to="/ai"
                            className="submenu-link"
                            onClick={() => setSidebarOpen(false)}
                        >
                            🎯 Career Feedback
                        </NavLink>

                    </div>

                }

            </div>

            <div className="sidebar-bottom">

            <button
               className="logout-btn"
                onClick={logout}
                   >

                     🚪 Logout

                   </button>

            </div>

        </div>

    );

}

export default Sidebar;