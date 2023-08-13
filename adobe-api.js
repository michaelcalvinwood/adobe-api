/*
 * https://developer.adobe.com/stock/docs/getting-started/apps/05-search-for-assets/#tips-and-techniques
 * https://developer.adobe.com/stock/docs/api/11-search-reference/
 * 
 */
require('dotenv').config();
const listenPort = 6301;
const hostname = 'adobe.pymnts.com'
const privateKeyPath = `/etc/letsencrypt/live/${hostname}/privkey.pem`;
const fullchainPath = `/etc/letsencrypt/live/${hostname}/fullchain.pem`;

const express = require('express');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const { ADOBE_API_KEY } = process.env;


const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '200mb'})); 
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const httpsServer = https.createServer({
    key: fs.readFileSync(privateKeyPath),
    cert: fs.readFileSync(fullchainPath),
  }, app);
  

  httpsServer.listen(listenPort, '0.0.0.0', () => {
    console.log(`HTTPS Server running on port ${listenPort}`);
});


const test = async () => {
    let request = {
        // url: `  https://stock.adobe.io/Rest/Media/1/Search/Files?search_parameters[words]=purple+clouds&locale=en_US`,
        url: `https://stock.adobe.io/Rest/Media/1/Search/Files`,
        method: 'get',
        params: {
            'search_parameters[words]': 'food delivery',
            'locale': 'en_US'
        },
        headers: {
            'x-api-key': ADOBE_API_KEY,
            'x-product': 'Test Project'
        }
    }

    try {
        const response = await axios(request);
        console.log(response.data);
    } catch(err) {
        console.error(err);
    }
}

test();