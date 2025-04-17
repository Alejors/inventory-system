class EmailServiceInterface {
    sendEmail(recipients, cc, bcc, subject, body, attachments) {
        throw new Error("Método 'sendEmail' no implementado");
    }
}

module.exports = EmailServiceInterface;