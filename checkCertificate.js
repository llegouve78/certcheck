const https = require('https');

const getCertificateExpiryDate = (hostname) => {
    const options = {
        hostname: hostname,
        port: 443,
        method: 'GET',
        rejectUnauthorized: false, // Bypass SSL validation
    };

    const req = https.request(options, (res) => {
        const certificate = res.connection.getPeerCertificate();
        if (!certificate || !certificate.valid_to) {
            console.error('No certificate information available.');
            return;
        }
        console.log(`The certificate for ${hostname} expires on: ${certificate.valid_to}`);
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
};

getCertificateExpiryDate('www.google.com');
