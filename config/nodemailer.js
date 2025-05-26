const nodemailer = require("nodemailer");
const ejs = require("ejs")
const path = require("path")
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

let renderTemplate = async (data, relativePath) => {
    try { 
        const templatePath = path.join(__dirname, "../views/mailers", relativePath);
        const template = await ejs.renderFile(templatePath, data);
        return template;
    } catch (err) {
        console.error("Error rendering template:", err);
        return null;
    }
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}