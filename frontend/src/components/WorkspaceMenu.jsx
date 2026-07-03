function WorkspaceMenu({ activeModule, setActiveModule }) {

    const tools = [

        {
            id: "jd",
            icon: "📊",
            title: "JD Analyzer",
            desc: "Analyze job requirements"
        },

        {
            id: "resume",
            icon: "📄",
            title: "Resume Analyzer",
            desc: "Compare your resume"
        },

        {
            id: "interview",
            icon: "💻",
            title: "Interview Prep",
            desc: "Generate interview questions"
        },

        {
            id: "career",
            icon: "🎯",
            title: "Career Feedback",
            desc: "AI career suggestions"
        }

    ];

    return (

        <div className="workspace-card">

            <h2>🚀 Choose an AI Tool</h2>

            <div className="tool-grid">

                {tools.map((tool) => (

                    <div
                        key={tool.id}
                        className={`tool-card ${
                            activeModule === tool.id
                                ? "active-tool"
                                : ""
                        }`}
                        onClick={() => setActiveModule(tool.id)}
                    >

                        <h1>{tool.icon}</h1>

                        <h3>{tool.title}</h3>

                        <p>{tool.desc}</p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default WorkspaceMenu;