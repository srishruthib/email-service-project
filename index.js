const express = require("express");
const EmailService = require("./EmailService");
const MockProviderA = require("./MockProviderA");
const MockProviderB = require("./MockProviderB");

const app = express();
app.use(express.json());

const providerA = new MockProviderA();
const providerB = new MockProviderB();
const emailService = new EmailService(providerA, providerB);

app.get("/", (req, res) => {
    res.send("Email Service is running!");
});

app.post("/send-email", async (req, res) => {
    const { emailId, emailData } = req.body;
    if (!emailId || !emailData) {
        return res.status(400).json({ success: false, message: "emailId and emailData are required" });
    }

    await emailService.sendEmail(emailId, emailData);
    const status = emailService.getStatus(emailId);
    res.json({ success: true, status });
});

app.get("/status/:emailId", (req, res) => {
    const emailId = req.params.emailId;
    const status = emailService.getStatus(emailId);
    res.json({ success: true, status });
});

app.get("/run-tests", async (req, res) => {
    const results = [];

    const originalLog = console.log;
    const captureLog = (msg) => {
        results.push(msg);
        originalLog(msg);
    };
    console.log = captureLog;

    await emailService.sendEmail("email1", {
        to: "user@example.com",
        subject: "Hello",
        body: "Welcome!"
    });

    await emailService.sendEmail("email2", {
        to: "user2@example.com",
        subject: "Hi",
        body: "Test email"
    });

    await emailService.sendEmail("email1", {
        to: "user@example.com",
        subject: "Hello again",
        body: "Duplicate send"
    });

    results.push("📦 Status of email1: " + JSON.stringify(emailService.getStatus("email1")));
    results.push("📦 Status of email2: " + JSON.stringify(emailService.getStatus("email2")));

    console.log = originalLog;

    res.send("<pre>" + results.join("\n") + "</pre>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
