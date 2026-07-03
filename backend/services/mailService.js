const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOTP = async (email, otp) => {

    const info = await transporter.sendMail({
        

        from: `"AI Placement Copilot" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "Email Verification Code",

        html: `
            <div style="font-family:Arial;padding:20px">
                <h2>AI Placement Copilot</h2>

                <p>Your verification code is:</p>

                <h1 style="letter-spacing:6px;color:#2563eb;">
                    ${otp}
                </h1>

                <p>This code expires in 5 minutes.</p>
            </div>
        `,
    });
    console.log(info);

};

module.exports = { sendOTP };