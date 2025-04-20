// email-service/index.js
const express = require('express');
const dotenv = require('dotenv');
const SendGridService = require('./services/sendGridService');
const EmailController = require('./controllers/emailController');

dotenv.config();

const app = express();
app.use(express.json());

const emailService = new SendGridService(process.env.SENDGRID_API_KEY);
const emailController = new EmailController(emailService);

app.post('/send-email', (req, res) => emailController.sendEmail(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Microservicio de correo escuchando en el puerto ${PORT}`);
});