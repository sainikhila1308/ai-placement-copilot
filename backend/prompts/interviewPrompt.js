const buildInterviewPrompt = (jobDescription) => {

    return `
    
    You are an experienced Technical Interviewer.
    
    Based on the following Job Description, generate ONLY valid JSON.
    
    Return this format exactly:
    
    {
      "difficulty":"Easy/Medium/Hard",
      "technicalQuestions":[
      ],
      "codingQuestions":[
      ],
      "hrQuestions":[
      ],
      "revisionTopics":[
      ]
    }
    
    Job Description:
    
    ${jobDescription}
    
    `;
    
    };
    
    module.exports = buildInterviewPrompt;