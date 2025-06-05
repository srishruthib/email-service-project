class EmailService {
    constructor(providerA, providerB) {
        this.providerA = providerA;
        this.providerB = providerB;
        this.currentProvider = providerA;
        this.sentEmails = new Set();
        this.status = {};
        this.rateLimit = 5;
        this.sentCount = 0;
        this.resetRateLimit();
    }

    resetRateLimit() {
        setInterval(() => {
            this.sentCount = 0;
        }, 60000);
    }

    async sendEmail(emailId, emailData) {
        if (this.sentEmails.has(emailId)) {
            console.log(`Email ${emailId} already sent, skipping (idempotency)`);
            this.status[emailId] = { success: true, reason: 'Already sent (idempotent)', attempts: 0 };
            return;
        }

        if (this.sentCount >= this.rateLimit) {
            console.log('Rate limit reached, please wait');
            this.status[emailId] = { success: false, reason: 'Rate limit exceeded', attempts: 0 };
            return;
        }

        let attempts = 0;
        let maxRetries = 3;

        while (attempts < maxRetries) {
            try {
                attempts++;
                await this.currentProvider.send(emailData);
                console.log(`Email ${emailId} sent successfully by ${this.currentProvider.name}`);
                this.sentEmails.add(emailId);
                this.sentCount++;
                this.status[emailId] = {
                    success: true,
                    provider: this.currentProvider.name,
                    attempts
                };
                return;
            } catch (error) {
                console.log(`Attempt ${attempts} failed for ${this.currentProvider.name}: ${error.message}`);
                if (attempts === maxRetries) {
                    if (this.currentProvider === this.providerA) {
                        console.log('Switching to fallback provider');
                        this.currentProvider = this.providerB;
                        attempts = 0;
                    } else {
                        console.log(`Failed to send email ${emailId} via both providers`);
                        this.status[emailId] = {
                            success: false,
                            reason: 'All attempts failed',
                            attempts
                        };
                        return;
                    }
                }
                await new Promise(res => setTimeout(res, 1000 * 2 ** attempts));
            }
        }
    }
    getStatus(emailId) {
        return this.status[emailId] || 'No status available';
    }
}

module.exports = EmailService;
