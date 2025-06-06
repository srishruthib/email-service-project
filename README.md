📧 Resilient Email Sending Service

This is a mock Email Sending Service built with Node.js (JavaScript) designed to simulate a real-world email system with robustness features like retries, fallback providers, idempotency, and more.

---

 ## 🚀 Core Features (as per assignment) + Enhancements

✅ Retry mechanism with exponential backoff (up to 3 attempts)
✅ Fallback to secondary provider if primary fails
✅ Idempotency – avoids duplicate email sends
✅ Basic rate limiting (5 emails per minute)
✅ Status tracking for every email ID

🔧 (Bonus) REST API to send/check email status via HTTP
🔧 (Bonus) /run-tests browser endpoint for easy Render testing

---

📁 Project Structure

email-service-project/
├── EmailService.js          # Core email logic
├── MockProviderA.js         # Mock email provider A
├── MockProviderB.js         # Mock email provider B
├── index.js                 # Main Express server with API & /run-tests
├── testEmailService.js      # CLI test runner for local console logs
├── testEmailService.test.js # Jest unit tests
├── package.json             # Project metadata and dependencies
├── README.md                # Documentation

---

🛠️ Setup & Usage
1. Prerequisites
Node.js installed → https://nodejs.org

2. Installation

git clone https://github.com/srishruthib/email-service-project.git
cd email-service-project
npm install

▶️ Running the Service

Option A: Local Testing (Console Output)
node testEmailService.js
Sample Output:

Starting email send tests...

ProviderA sent: user@example.com
Email email1 sent successfully by ProviderA
Attempt 1 failed for ProviderA: ProviderA failed to send email
...
📦 Status of email1: { success: true, reason: 'Already sent (idempotent)' }
📦 Status of email2: { success: true, provider: 'ProviderB', attempts: 2 }

Option B: Run Server (API Mode)

node index.js
By default, it runs on: http://localhost:3000

---

🌐 API Endpoints
GET /
Health check — returns a plain message.

POST /send-email
Sends an email.

Request Body:

{
  "emailId": "email1",
  "emailData": {
    "to": "user@example.com",
    "subject": "Hello",
    "body": "Test email"
  }
}
Response:

{
  "success": true,
  "status": {
    "success": true,
    "provider": "ProviderA",
    "attempts": 1
  }
}
GET /status/:emailId
Returns the delivery status of the email.

Example:
GET /status/email1

GET /run-tests
Runs predefined test emails and returns a formatted output in the browser.
Useful when deployed on Render.com.

---

🔗 Example Render Test Link:
https://email-service-project-5.onrender.com/run-tests

---

🧠 Assumptions

✔ Providers are mocked and simulate failure randomly
✔ ProviderA fails 50%,ProviderB fails 30%
✔ Each emailId is unique and ensures idempotency.
✔ Rate limit is set to 5 emails per 60 seconds.
✔ No actual emails are sent — this is a mock simulation.
✔ Internal state is maintained in-memory and resets on restart.

---

✍️ Author
B. Sri Shruthi
Backend Developer Trainee | PearlThoughts
