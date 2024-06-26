const express = require('express');
const request = require('request');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/send-requests', (req, res) => {
    const { url, proxies } = req.body;

    let completedRequests = 0;

    proxies.forEach(proxy => {
        const proxyUrl = `http://${proxy.trim()}`;
        request({
            url: url,
            proxy: proxyUrl,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }, (error, response, body) => {
            completedRequests++;
            if (error) {
                console.error(`Failed to send request using proxy ${proxy}, Error: ${error}`);
            } else {
                console.log(`Request sent using proxy ${proxy}, Status code: ${response.statusCode}`);
            }

            if (completedRequests === proxies.length) {
                res.send('All requests completed.');
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
