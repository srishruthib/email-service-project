class MockProviderB {
    constructor() {
        this.name = 'ProviderB';
    }

    async send(emailData) {
        if (Math.random() < 0.3) {
            throw new Error('ProviderB failed to send email');
        }
        console.log('ProviderB sent:', emailData.to);
    }
}

module.exports = MockProviderB;
