const AISession = require("../models/AISessions");

const buildJDPrompt = require("../prompts/jdPrompt");
const buildCareerPrompt =
require("../prompts/careerPrompt");

const {
  generateResponse,
} = require("../services/groqService");

const analyzeJD = async (req, res) => {
  try {
    const session = await AISession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    const prompt = buildJDPrompt(session.jobDescription);

    const response = await generateResponse(prompt);

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(response);
    } catch (error) {
      console.log("Groq Response:");
      console.log(response);

      return res.status(500).json({
        message: "Groq returned invalid JSON",
        raw: response,
      });
    }

    res.status(200).json(parsedResponse);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
const buildInterviewPrompt =
require("../prompts/interviewPrompt");

const interviewPreparation = async (req,res)=>{

    try{

        const session =
        await AISession.findById(req.params.id);

        if(!session){

            return res.status(404).json({
                message:"Session not found"
            });

        }

        const prompt =
        buildInterviewPrompt(
            session.jobDescription
        );

        const response =
        await generateResponse(prompt);

        res.json(JSON.parse(response));

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:error.message

        });

    }

};
const careerFeedback = async (req, res) => {

    try {

        const session =
        await AISession.findById(req.params.id);

        if (!session) {

            return res.status(404).json({
                message: "Session not found"
            });

        }

        const prompt =
        buildCareerPrompt(
            session.jobDescription
        );

        const response =
        await generateResponse(prompt);

        res.json(JSON.parse(response));

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
  analyzeJD,
  interviewPreparation,
  careerFeedback,
};