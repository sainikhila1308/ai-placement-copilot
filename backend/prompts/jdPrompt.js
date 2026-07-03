const buildJDPrompt = (jobDescription) => {
    return `
  You are an expert Software Engineering Career Advisor and ATS Resume Expert.
  
  Analyze the following Job Description carefully.
  
  IMPORTANT RULES:
  
  1. Return ONLY valid JSON.
  2. Do NOT include markdown.
  3. Do NOT use \`\`\`json.
  4. Do NOT write explanations before or after the JSON.
  5. Every field must exist.
  6. Arrays should contain concise strings.
  
  Return EXACTLY in this format:
  
  {
    "requiredSkills": [],
    "atsKeywords": [],
    "responsibilities": [],
    "learningTopics": [],
    "difficulty": ""
  }
  
  Difficulty should be one of:
  "Easy"
  "Intermediate"
  "Advanced"
  
  Job Description:
  
  ${jobDescription}
  `;
  };
  
  module.exports = buildJDPrompt;