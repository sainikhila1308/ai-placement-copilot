const pdfParse = require("pdf-parse");

const extractResumeText = async (buffer) => {
    try {
        const data = await pdfParse(buffer);
        return data.text;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    extractResumeText,
};