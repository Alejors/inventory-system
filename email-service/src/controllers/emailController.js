class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }

    async sendEmail(req, res) {
        const { recipients, cc, bcc, subject, body, attachments } = req.body;

        try {
            const result = await this.emailService.sendEmail(recipients, cc, bcc, subject, body, attachments);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = EmailController;
