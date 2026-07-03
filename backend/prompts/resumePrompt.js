const buildResumePrompt = (
    resume,
    jobDescription
) => {

return `

You are an expert ATS Resume Reviewer.

Compare the Resume against the Job Description.

Return ONLY JSON.

{
    "matchScore":0,
    "strengths":[],
    "missingSkills":[],
    "atsSuggestions":[],
    "improvedBulletPoints":[]
}

Resume:

${resume}

Job Description:

${jobDescription}

`;

};

module.exports = buildResumePrompt;