// sendMail.js

const nodemailer = require("nodemailer");

const sendPasswordResetEmail = async (options, resetToken) => { // Update the function signature
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: "Reset Password",
        text: options.message + ` Reset Token: ${resetToken}`, // Include reset token in the email message
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendPasswordResetEmail;
