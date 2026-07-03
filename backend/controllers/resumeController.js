const AISession = require("../models/AISessions");

const {
    extractResumeText,
} = require("../services/resumeService");

const {
    generateResponse,
} = require("../services/groqService");

const buildResumePrompt =
    require("../prompts/resumePrompt");

const analyzeResume = async (req, res) => {

    try {

        const session =
            await AISession.findById(req.params.id);

        if (!session) {

            return res.status(404).json({
                message: "Session not found",
            });

        }

        if (!req.file) {

            return res.status(400).json({
                message: "Resume missing",
            });

        }

        const resumeText =
            await extractResumeText(req.file.buffer);

        const prompt =
            buildResumePrompt(
                resumeText,
                session.jobDescription
            );

        const response =
            await generateResponse(prompt);
            console.log(response);

            let cleanResponse = response
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        
        res.json(JSON.parse(cleanResponse));

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message,

        });

    }

};

module.exports = {

    analyzeResume,

};