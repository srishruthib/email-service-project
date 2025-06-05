# 📧 Resilient Email Sending Service

This is a mock email sending service built in **JavaScript (Node.js)** designed to simulate real-world robustness requirements. It features retry logic, fallback providers, idempotency, rate limiting, and email status tracking.

---

## 🚀 Features

✅ Retry mechanism with exponential backoff  
✅ Fallback between two providers  
✅ Idempotency to prevent duplicate sends  
✅ Basic rate limiting (5 emails per minute)  
✅ Status tracking for every email ID  

---

## 📁 Project Structure

email-service-project/
├── EmailService.js          # Main service logic
├── MockProviderA.js         # First mock email provider
├── MockProviderB.js         # Second mock email provider
├── index.js                 # Entry point to run and test the service
├── testEmailService.test.js # Unit tests using Jest
├── package.json             # Project dependencies & scripts
├── README.md                # Project documentation

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js installed: [https://nodejs.org](https://nodejs.org)

### 2. Clone the repo (if applicable)

git clone https://github.com/srishruthib/email-service-project.git
cd email-service-project
💡Or create a folder and paste your files if you're not using Git.

3. Install dependencies
npm install

4. Run the service
node testEmailService.js

---

🧪 Sample Output

Email email1 sent successfully by ProviderA
Email email2 sent successfully by ProviderA
Email email1 already sent, skipping (idempotency)
📦 Status of email1: { success: true, reason: 'Already sent (idempotent)', attempts: 0 }
📦 Status of email2: { success: true, provider: 'ProviderA', attempts: 1 }

---

🧠 Assumptions

✔ Providers are mocked and simulate failure randomly 

✔ ProviderA fails 50%,ProviderB fails 30%

✔ Each emailId is unique and ensures idempotency.

✔ Rate limit is set to 5 emails per 60 seconds.

✔ No actual emails are sent — this is a mock simulation.

✔ Internal state is maintained in-memory and resets on restart.

---

**B. Sri Shruthi**  
Backend Developer Trainee Candidate | PearlThoughts


