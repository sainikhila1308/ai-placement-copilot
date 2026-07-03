const buildCareerPrompt = (jobDescription) => {

    return `

You are an expert Software Engineering Career Mentor.

Analyze the following Job Description.

Return ONLY valid JSON.

{
    "fitScore": 0,
    "strengths": [],
    "missingSkills": [],
    "learningRoadmap": [],
    "projectsToBuild": [],
    "certifications": [],
    "estimatedPreparationTime": ""
}

Job Description:

${jobDescription}

`;

};

module.exports = buildCareerPrompt;